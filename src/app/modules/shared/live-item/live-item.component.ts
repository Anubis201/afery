import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveItemModel } from 'src/app/models/articles/live-item.model';

@Component({
  selector: 'app-live-item',
  templateUrl: './live-item.component.html',
  styleUrls: ['./live-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveItemComponent {
  @Input() item: LiveItemModel
  @Input() isAdminPage: boolean

  constructor(private sanitizer: DomSanitizer) {}

  checkHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
