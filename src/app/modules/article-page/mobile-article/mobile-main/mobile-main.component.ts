import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-mobile-main',
  templateUrl: './mobile-main.component.html',
  styleUrls: ['./mobile-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMainComponent {
  @Input() text: string
  @Input() tags: string
  @Input() subtitle: string
}
