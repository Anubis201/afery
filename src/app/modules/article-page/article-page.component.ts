import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

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
  ) { }

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
        this._snackBar.open('Komentarz został dodany' ,'close');
        this.isSavingComment = false;
      },
      error: () => {
        this._snackBar.open('Nie udało się dodać komentarza' ,'close');
        this.isSavingComment = false;
      }
    })
  }

  getComments(articleId: string) {
    this.commentsService.getComments(articleId).subscribe({
      next: commentsDocs => {
        let allComments: CommentModel[] = [];
        commentsDocs.forEach(comment => {
          allComments.push({ ...comment.data() as CommentModel, date: (comment.data() as any).date.toDate() });
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

  // TODO Czeka na naprawienie bledu angular universe i sprawdzenie tego rozwiozania
  private prepereTags(title: string, image: string) {
    this.meta.addTags([
      { property: 'og:type', content: 'article' },
      { property: 'og:title', content: title },
      { property: 'og:image', content: image },
    ]);
  }

  private getData(articleId: string) {
    this.articlesService.getArticle(articleId).subscribe(article => {
      if (article.exists) {
        this.article.next({ ...article.data() as ArticleModel, id: article.id, createDate: (article.data() as any).createDate.toDate() });
        this.prepereTags(this.article.value?.title as string, this.article.value?.imageSrc as string);
      } else this.isExists.next(false);
    })
  }

  private updateViewership(articleId: string) {
    this.articlesService.updateViewershipArticle(articleId)
  }
}
