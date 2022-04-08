import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-live-button',
  templateUrl: './live-button.component.html',
  styleUrls: ['./live-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveButtonComponent {
  @Input() isMobileVersion: boolean

}
