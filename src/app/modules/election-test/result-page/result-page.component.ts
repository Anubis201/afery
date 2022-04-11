import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultPageComponent {
  @Input() result: any[]

  @Output() goToCheckResult = new EventEmitter<void>()
}
