import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-table-poll',
  templateUrl: './table-poll.component.html',
  styleUrls: ['./table-poll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePollComponent {
  @Input() poll: PollModel

  displayedColumns: string[] = ['party', 'percentage']

  readonly PartiesEnum = PartiesEnum
}
