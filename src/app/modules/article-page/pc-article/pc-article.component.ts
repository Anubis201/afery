import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Component({
  selector: 'app-pc-article',
  templateUrl: './pc-article.component.html',
  styleUrls: ['./pc-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PcArticleComponent {
  @Input() article: ArticleModel
  @Input() isAdmin: boolean
  @Input() nextArticle: ArticleModel

  @Output() setToFirstArticle = new EventEmitter<void>()
  @Output() handleEditArticle = new EventEmitter<void>()
  @Output() handleDeleteArticle = new EventEmitter<void>()
  @Output() handleLike = new EventEmitter<number>()
  @Output() handleDislike = new EventEmitter<number>()
}
