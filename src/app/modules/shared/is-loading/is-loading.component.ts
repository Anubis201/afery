import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-is-loading',
  templateUrl: './is-loading.component.html',
  styleUrls: ['./is-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IsLoadingComponent {
  @Input() size = 40
}
