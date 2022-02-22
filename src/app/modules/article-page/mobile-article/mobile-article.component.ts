import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { CommentModel } from 'src/app/models/articles/comment.model';

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
}
