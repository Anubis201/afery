import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileHeaderComponent {
  @Input() type: ArticlesTypesEnum
  @Input() entity: PartiesEnum
  @Input() title: string
  @Input() createDate: Date
  @Input() text: string
  @Input() actionMode: 'like' | 'dislike' | null
  @Input() likes: number
  @Input() dislikes: number
  @Input() imageDesc: string
  @Input() imageSrc: string

  @Output() approve = new EventEmitter<void>()
  @Output() dislike = new EventEmitter<void>()

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  pageUrl() {
    return location.href
  }
}
