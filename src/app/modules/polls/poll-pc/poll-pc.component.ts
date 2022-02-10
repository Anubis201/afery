import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-poll-pc',
  templateUrl: './poll-pc.component.html',
  styleUrls: ['./poll-pc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollPcComponent {
  @Input() poll: PollModel

}
