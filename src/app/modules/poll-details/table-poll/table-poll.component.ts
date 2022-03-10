import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { TablePollModel } from 'src/app/models/polls/table-poll.model';
import { addItem } from 'src/app/services/animations/table.animations';

type Columns = keyof TablePollModel

@Component({
  selector: 'app-table-poll',
  templateUrl: './table-poll.component.html',
  styleUrls: ['./table-poll.component.scss'],
  animations: [addItem],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePollComponent {
  @Input() parties: PartyCharModel[]
  @Input() set compareData(data: PartyCharModel[]) {
    this.dataSource.next(this.parties.map(current => ({
      party: current.party,
      previousValue: data ? data.find(v => v.party === current.party).percentage : 0,
      difference: parseFloat((data ? current.percentage - data.find(v => v.party === current.party).percentage : current.percentage).toFixed(1)),
      percentage: current.percentage,
    })));
  }

  dataSource = new BehaviorSubject<TablePollModel[]>([])
  displayedColumns: Columns[] = ['party', 'difference', 'percentage', 'previousValue']

  readonly PartiesEnum = PartiesEnum
}
