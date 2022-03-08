import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

@Component({
  selector: 'app-pc-header',
  templateUrl: './pc-header.component.html',
  styleUrls: ['./pc-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PcHeaderComponent {
  @Input() isAdmin: boolean
  @Input() type: ArticlesTypesEnum
  @Input() entity: PartiesEnum
  @Input() costs: number
  @Input() title: string
  @Input() createDate: Date
  @Input() text: string
  @Input() likes: number
  @Input() dislikes: number
  @Input() nextArticle: ArticleModel
  @Input() id: string
  @Input() isShort = false

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  @Output() setToFirstArticle = new EventEmitter<void>()
  @Output() handleEditArticle = new EventEmitter<void>()
  @Output() handleDeleteArticle = new EventEmitter<void>()
  @Output() handleLike = new EventEmitter<number>()
  @Output() handleDislike = new EventEmitter<number>()

  pageUrl() {
    return location.href
  }
}
