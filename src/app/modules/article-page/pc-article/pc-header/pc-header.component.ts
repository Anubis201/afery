import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() viewership: number
  @Input() title: string
  @Input() createDate: Date
  @Input() text: string
  @Input() actionMode: 'like' | 'dislike' | null
  @Input() likes: number
  @Input() dislikes: number

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  @Output() setToFirstArticle = new EventEmitter<void>()
  @Output() handleEditArticle = new EventEmitter<void>()
  @Output() handleDeleteArticle = new EventEmitter<void>()
  @Output() approve = new EventEmitter<void>()
  @Output() dislike = new EventEmitter<void>()

  pageUrl() {
    return location.href
  }
}
