import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title: string
  @Input() sortingMethod: 'poll' | 'election'

  @Output() comparePreviousElection = new EventEmitter<void>()
  @Output() comparePreviousPoll = new EventEmitter<void>()
}
