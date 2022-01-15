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
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { ImagesService } from 'src/app/services/collections/images/images.service';
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
    const rlyComment: CommentModel = { ...comment, articleId: this.article.value?.id as string };

    this.commentsService.addComment(rlyComment).subscribe({
      next: () => {
        this.comments.next([rlyComment , ...this.comments.value]);
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
          allComments.push({ ...comment.data() as CommentModel, date: (comment.data() as any).date.toDate(), id: comment.id });
        });
        this.comments.next(allComments);
      },
      error: () => {
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

  // TODO WAŻNE !!! 500max komentarzy na jeden batch. KIEDYS TRZEBA BEDZIE TO NAPRAWIC :D
  private removeAllComments(id: string) {
    return this.commentsService.getComments(id).pipe(
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
  private prepereTagsAndTitle(title: string, image: string) {
    this.titleService.setTitle(title);
    // FACEBOOK
    // this.meta.addTags([
    //   { property: 'og:type', content: 'article' },
    //   { property: 'og:title', content: title },
    //   { property: 'og:image', content: image },
    // ]);
  }

  private getData(articleId: string) {
    this.articlesService.getArticle(articleId).subscribe(article => {
      if (article.exists) {
        this.article.next({ ...article.data() as ArticleModel, id: article.id, createDate: (article.data() as any).createDate.toDate() });
        this.prepereTagsAndTitle(this.article.value?.title as string, this.article.value?.imageSrc as string);
      } else this.isExists.next(false);
    })
  }

  private updateViewership(articleId: string) {
    this.articlesService.updateViewershipArticle(articleId)
  }
}
