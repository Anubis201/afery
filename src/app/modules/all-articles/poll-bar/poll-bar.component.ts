import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';

interface SomethingModel {
  party: PartiesEnum,
  percentage: number,
  difference: number
}

@Component({
  selector: 'app-poll-bar',
  templateUrl: './poll-bar.component.html',
  styleUrls: ['./poll-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollBarComponent implements OnInit {
  poll = new BehaviorSubject<PollModel>(null)
  data = new BehaviorSubject<SomethingModel[]>([])

  readonly PartiesEnum = PartiesEnum

  constructor(
    private pollsService: PollsService,
  ) { }

  ngOnInit() {
    this.getNewestPoll();
  }

  private previousPoll() {
    this.pollsService.getPreviousPoll(this.poll.value.surveying, this.poll.value.when).subscribe({
      next: data => {
        this.setData(data);
      }
    })
  }

  private getNewestPoll() {
    this.pollsService.getNewestPollParty().subscribe({
      next: docs => {
        docs.forEach(doc => {
          this.poll.next(doc.data() as PollModel);
        })
        this.previousPoll();
      },
    })
  }

  private setData(poll: PollModel) {
    this.data.next((this.poll.value.items as unknown as PartyCharModel[]).map(current => ({
      party: current.party,
      difference: !poll ? 0 : parseFloat((poll ? current.percentage - (poll.items as unknown as PartyCharModel[]).find(v => v.party === current.party).percentage : current.percentage).toFixed(1)),
      percentage: current.percentage,
    })));
  }
}
