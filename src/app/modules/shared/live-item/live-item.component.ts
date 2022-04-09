import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
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
  @Input() form: FormGroup // LiveItemModel

  isEdit = new BehaviorSubject<boolean>(false)

  constructor(private sanitizer: DomSanitizer) {}

  handleEdit() {
    this.isEdit.next(!this.isEdit.value);
  }

  checkHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
