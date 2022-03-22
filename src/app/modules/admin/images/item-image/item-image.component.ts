import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ImageModel } from 'src/app/models/others/image.model';

@Component({
  selector: 'app-item-image',
  templateUrl: './item-image.component.html',
  styleUrls: ['./item-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemImageComponent {
  @Input() label: string
  @Input() items: ImageModel[]
  @Input() isArticleImage = false

  toArticlePage(id: string) {
    return `/artykul/${id}/cos`
  }

}
