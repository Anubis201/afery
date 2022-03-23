import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/polls/poll.model';
import { newsAnimation } from 'src/app/services/animations/news.animations';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';

interface SomethingModel {
  party: PartiesEnum,
  percentage: number,
  difference: number
}

@Component({
  selector: 'app-poll-bar',
  templateUrl: './poll-bar.component.html',
  styleUrls: ['./poll-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [newsAnimation]
})
export class PollBarComponent implements OnInit, AfterViewInit {
  poll = new BehaviorSubject<PollModel>(null)
  data = new BehaviorSubject<SomethingModel[]>([])
  state = new BehaviorSubject<'in' | 'out'>('in');
  isLoading = new BehaviorSubject<boolean>(true)

  readonly PartiesEnum = PartiesEnum

  constructor(
    private pollsService: PollsService,
    private datePipe: DatePipe,
  ) { }

  get toPage() {
    const date = this.datePipe.transform(this.poll.value?.when,'yyyy-MM-dd');
    return `/sondaz/${this.poll.value?.id}/${ChangePolishChars(`${this.poll.value?.surveying}-${date}`)}`
  }

  ngOnInit() {
    this.getNewestPoll();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.state.next('out');
    }, 0);
  }

  onEnd(event) {
    this.state.next('in');
    if (event.toState === 'in') {
      setTimeout(() => {
        this.state.next('out');
      }, 0);
    }
  }

  private previousPoll() {
    this.pollsService.getPreviousPoll(this.poll.value.surveying, this.poll.value.when).subscribe({
      next: data => {
        this.setData(data);
      },
      error: () => {
        this.isLoading.next(false);
      }
    })
  }

  private getNewestPoll() {
    this.pollsService.getNewestPollParty().subscribe({
      next: docs => {
        docs.forEach(doc => {
          this.poll.next({
            ...doc.data() as PollModel,
            when: (doc.data() as any).when.toDate(),
            id: doc.id,
          });
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
    this.isLoading.next(false);
  }
}
