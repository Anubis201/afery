import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-pc-main',
  templateUrl: './pc-main.component.html',
  styleUrls: ['./pc-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PcMainComponent {
  @Input() subtitle: string
  @Input() imageSrc: string
  @Input() title: string
  @Input() text: string
  @Input() imageDesc: string
}
