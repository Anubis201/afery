import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
}
