import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, catchError, from, map, throwError, zip } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollModel } from 'src/app/models/polls/poll.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { ImagesService } from 'src/app/services/collections/images/images.service';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
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
  comments = new BehaviorSubject<CommentModel[]>([])
  actionMode = new BehaviorSubject<'like' | 'dislike' | null>(null)
  poll = new BehaviorSubject<PollModel>(null)

  isSavingComment = false

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
    private pollsService: PollsService,
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  ngOnInit() {
    this.route.params.subscribe(({ articleId }) => {
      this.getData(articleId);
      this.getComments(articleId);
      this.updateViewership(articleId);
    })
  }

  handleAddComment(comment: CommentModel) {
    this.isSavingComment = true;
    const rlyComment: CommentModel = {
      ...comment,
      articleId: this.article.value?.id as string,
      isNew: true,
      isAnswer: false,
    };

    this.commentsService.addComment(rlyComment).subscribe({
      next: doc => {
        this.comments.next([{ ...rlyComment, id: doc.id }, ...this.comments.value]);
        this.isSavingComment = false;
      },
      error: () => {
        this.isSavingComment = false;
      }
    })
  }

  getComments(articleId: string) {
    this.commentsService.getComments(articleId).subscribe({
      next: commentsDocs => {
        let allComments: CommentModel[] = [];
        commentsDocs.forEach(comment => {
          allComments.push({
            ...comment.data() as CommentModel,
            date: (comment.data() as any).date.toDate(),
            id: comment.id
          });
        });
        this.comments.next(allComments);
      },
      error: err => {
        console.log(err)
        this._snackBar.open('Nie udało się pobrać komentarzy', 'close');
      }
    })
  }

  pageUrl() {
    return location.href
  }

  handleDeleteComment(id: string) {
    this.commentsService.deteleComment(id).subscribe({
      next: () => {
        this.comments.next(this.comments.value.filter(filterV => filterV.id !== id));
        this._snackBar.open('Komentarz został usunięty', 'close');
      },
      error: () => {
        this._snackBar.open('Błąd', 'close');
      }
    })
  }

  handleDeleteArticle(id: string) {
    // aby usunąć artykuł najpierw musi miec potwierdzenie ze usunieto zdjecie i komentarze
    zip(
      this.removeAllComments(id),
      this.imagesService.deleteImage(id),
    ).subscribe({
      next: ([]) => {

        this.articlesService.deleteArticle(id).subscribe({
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

  handleEditArticle(id: string) {
    this.router.navigate(
      ['/admin/create'],
      { queryParams: { id } }
    )
  }

  hideArticle(id: string) {
    this.articlesService.editArticle({ isHide: true }, id).subscribe({
      next: () => {
        this.article.next({
          ...this.article.value as ArticleModel,
          isHide: true,
        })
        this._snackBar.open('Ukryto artykuł', 'close');
      },
      error: () => this._snackBar.open('Nie udało się ukryć artykułu', 'close')
    })
  }

  showArticle(id: string) {
    this.articlesService.editArticle({ isHide: false }, id).subscribe({
      next: () => {
        this.article.next({
          ...this.article.value as ArticleModel,
          isHide: false,
        })
        this._snackBar.open('Ukryto artykuł', 'close');
      },
      error: () => this._snackBar.open('Nie udało się ukryć artykułu', 'close')
    })
  }

  getNewestPoll() {
    this.pollsService.getNewestPoll().subscribe({
      next: doc => {
        doc.forEach(e => {
          this.poll.next(e.data() as PollModel);
        })
      },
    })
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

  // TODO Czeka na naprawienie bledu angular universe i sprawdzenie tego rozwiozania
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

        if (location.href.slice(-5) !== 'zmien') this.router.navigate(['artykul/', this.article.value.id, ChangePolishChars(this.article.value.title.replace(/\s/g, '-'))]);

        if (localStorage.getItem(this.article.value.id) === 'like')
          this.actionMode.next('like');
        else if (localStorage.getItem(this.article.value.id) === 'dislike')
          this.actionMode.next('dislike');

        this.getNewestPoll();

      } else this.isExists.next(false);
    })
  }

  private updateViewership(articleId: string) {
    this.articlesService.updateViewershipArticle(articleId)
  }
}
