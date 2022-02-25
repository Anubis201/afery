import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

@Component({
  selector: 'app-mobile-article',
  templateUrl: './mobile-article.component.html',
  styleUrls: ['./mobile-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileArticleComponent {
  @Input() article: ArticleModel
  @Input() comments: CommentModel[]
  @Input() isSavingComment: boolean
  @Input() actionMode: 'like' | 'dislike' | null
  @Input() isAdmin: boolean
  @Input() nextArticle: ArticleModel
  @Input() userName: string

  @Output() approve = new EventEmitter<void>()
  @Output() dislike = new EventEmitter<void>()
  @Output() addComment = new EventEmitter<CommentModel>()
  @Output() handleDeleteComment = new EventEmitter<string>()

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  pageUrl() {
    return location.href
  }
}
