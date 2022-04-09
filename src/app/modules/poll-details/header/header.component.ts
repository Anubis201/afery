import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() title: string
  @Input() isAdmin: boolean
  @Input() sortingMethod: 'poll' | 'election'
  @Input() typeItems: PollDataEnum

  @Output() comparePreviousElection = new EventEmitter<void>()
  @Output() comparePreviousPoll = new EventEmitter<void>()
  @Output() editPoll = new EventEmitter<void>()
  @Output() deletePoll = new EventEmitter<void>()

  readonly PollDataEnum = PollDataEnum
}
