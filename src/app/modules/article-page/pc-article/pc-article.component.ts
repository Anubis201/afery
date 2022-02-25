import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';

@Component({
  selector: 'app-pc-article',
  templateUrl: './pc-article.component.html',
  styleUrls: ['./pc-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PcArticleComponent {
  @Input() article: ArticleModel
  @Input() comments: CommentModel[]
  @Input() isSavingComment: boolean
  @Input() actionMode: 'like' | 'dislike' | null
  @Input() isAdmin: boolean
  @Input() nextArticle: ArticleModel
  @Input() userName: string

  @Output() setToFirstArticle = new EventEmitter<void>()
  @Output() handleEditArticle = new EventEmitter<void>()
  @Output() handleDeleteArticle = new EventEmitter<void>()
  @Output() handleDeleteComment = new EventEmitter<string>()
  @Output() addComment = new EventEmitter<CommentModel>()
  @Output() approve = new EventEmitter<void>()
  @Output() dislike = new EventEmitter<void>()
}
