import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, from, map, of, throwError, zip } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { ImagesService } from 'src/app/services/collections/images/images.service';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit {
  article = new BehaviorSubject<ArticleModel | null>(null)
  isExists = new BehaviorSubject<boolean>(true)
  actionMode = new BehaviorSubject<'like' | 'dislike' | null>(null)
  nextArticle = new BehaviorSubject<ArticleModel>(null)

  readonly PartiesEnum = PartiesEnum
  readonly ArticlesTypesEnum = ArticlesTypesEnum

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private _snackBar: MatSnackBar,
    private meta: Meta,
    private userService: UserService,
    private db: AngularFirestore,
    private imagesService: ImagesService,
    private router: Router,
    private titleService: Title,
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  ngOnInit() {
    this.route.params.subscribe(({ articleId }) => {
      this.getData(articleId);
      this.updateViewership(articleId);
    })
  }

  handleDeleteArticle() {
    // aby usunąć artykuł najpierw musi miec potwierdzenie ze usunieto zdjecie i komentarze
    zip(
      this.removeAllComments(this.article.value.id),
      this.imagesService.deleteImage(this.article.value.id),
    ).subscribe({
      next: ([]) => {
        this.articlesService.deleteArticle(this.article.value.id).subscribe({
          next: () => {
            this._snackBar.open('Artykuł został usunięty', 'close');
            this.router.navigateByUrl('/');
          },
          error: () => {
            this._snackBar.open('Błąd usuwania artykułu', 'close');
          }
        })
      },
      error: () => this._snackBar.open('Nie udało się usunąć artykułu', 'close')
    })
  }

  handleEditArticle() {
    this.router.navigate(
      ['/admin/create'],
      { queryParams: { id: this.article.value.id } }
    )
  }

  approve(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.actionMode.value === 'like' || forceMinus) {
      if (this.actionMode.value === 'like') localStorage.removeItem(this.article.value.id);
      value = -1;
      this.actionMode.next(null);
    } else {
      if (this.actionMode.value === 'dislike') this.dislike(true);
      this.actionMode.next('like');
      localStorage.setItem(this.article.value.id, 'like');
      value = 1;
    }

    this.articlesService.updateLikes(this.article.value.id, value).subscribe({
      next: () => {
        this.article.next({
          ...this.article.value,
         likes: this.article?.value.likes + value,
        });
        this.article.next({
          ...this.article.value,
          likes: isNaN(this.article.value.likes) ? 1 : this.article.value.likes
        })
      },
    })
  }

  dislike(forceMinus?: boolean) {
    let value: -1 | 1

    if (this.actionMode.value === 'dislike' || forceMinus) {
      if (this.actionMode.value === 'dislike') localStorage.removeItem(this.article.value.id);
      value = -1;
      this.actionMode.next(null);
    } else {
      if (this.actionMode.value === 'like') this.approve(true);
      this.actionMode.next('dislike');
      localStorage.setItem(this.article.value.id, 'dislike');
      value = 1;
    }

    this.articlesService.updateDislikes(this.article.value.id, value).subscribe({
      next: () => {
        this.article.next({
          ...this.article.value,
          dislikes: this.article.value?.dislikes + value
        });
        this.article.next({
          ...this.article.value,
          dislikes: this.article.value.dislikes = isNaN(this.article.value.dislikes) ? 1 : this.article.value.dislikes,
        });
      },
    })
  }

  setToFirstArticle() {
    this.articlesService.getFirstTOPArticle().pipe(
      map(value => {
        if (value.size) {
          value.forEach(doc => {
            return from(doc.ref.update({ isFirstArticle: false }))
          })
        }

        return of();
      }),
      map(() => {
        return this.articlesService.editArticle({ isFirstArticle: true }, this.article.value.id)
      })
    ).subscribe({
      next: () => {
        this._snackBar.open('Wszystko się udało', 'close');
      },
    })
  }

  // TODO WAŻNE !!! 500max komentarzy na jeden batch. KIEDYS TRZEBA BEDZIE TO NAPRAWIC :D
  // DODAC USUWANIE ODPOWIEDZI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  private removeAllComments(id: string) {
    return this.commentsService.getCommentsToDelete(id).pipe(
      map(comments => {
        let batch = this.db.firestore.batch();

        comments.forEach(doc => batch.delete(doc.ref));

        return from(batch.commit());
      }),
      catchError((err) => {
        this._snackBar.open('Nie udało się usunąć komentarzy', 'close');
        return throwError(() => new Error(err));
      })
    )
  }

  // TODO Czeka na naprawienie bledu angular universe i sprawdzenie tego rozwiozania twitter i facebook nie widzi javascripta
  private prepereTagsAndTitle() {
    this.titleService.setTitle(this.article.value.title);

    let tmp = document.createElement('DIV');
    tmp.innerHTML = this.article.value.text.split(/\s+/).slice(0, 20).join(' ');

    const content =
      this.article.value?.subtitle
      || (tmp.textContent || tmp.innerText || "")

    this.meta.updateTag({ name:'description', content }, "name='description'");

    this.meta.addTags([
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: this.article.value.title },
      { property: 'og:image', content: this.article.value.imageSrc },
      { property: 'og:local', content: 'pl_PL' },
      { property: 'og:site_name', content: 'Afery' },
      { property: 'og:url', content: window.location.href },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: 'Afery' },
      { name: 'twitter:title', content: this.article.value.title },
      { name: 'twitter:image', content: this.article.value.imageSrc },
      { name: 'detailType', content: 'article' },
    ]);
  }

  private getData(articleId: string) {
    this.articlesService.getArticle(articleId).subscribe(article => {
      if (article.exists) {
        this.article.next({ ...article.data() as ArticleModel, id: article.id, createDate: (article.data() as any).createDate.toDate() });
        this.prepereTagsAndTitle();

        // upewnia sie czy wszystko jest dobrze z linkiem
        if (location.href.slice(-5) !== 'zmien')
          this.router.navigate(['artykul/', this.article.value.id, ChangePolishChars(this.article.value.title.replace(/\s/g, '-'))]);

        // sprawdza czy artykul zostal polubiony
        if (localStorage.getItem(this.article.value.id) === 'like')
          this.actionMode.next('like');
        else if (localStorage.getItem(this.article.value.id) === 'dislike')
          this.actionMode.next('dislike');

        // pobiera kolejny artykul do pokazania, narazie proste wyszukiwanie kolejnego
        this.getNextArticle();

      } else this.isExists.next(false);
    })
  }

  private getNextArticle() {
    this.articlesService.getNextArticle(this.article.value.createDate).subscribe(docs => {
      docs.forEach(doc => {
        this.nextArticle.next({ ...doc.data() as ArticleModel, id: doc.id, createDate: (doc.data() as any).createDate.toDate() });
      })
    })
  }

  private updateViewership(articleId: string) {
    this.articlesService.updateViewershipArticle(articleId)
  }
}
