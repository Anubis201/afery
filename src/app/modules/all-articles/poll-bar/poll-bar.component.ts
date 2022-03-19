import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';

@Component({
  selector: 'app-poll-bar',
  templateUrl: './poll-bar.component.html',
  styleUrls: ['./poll-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollBarComponent implements OnInit {
  poll = new BehaviorSubject<PollModel>(null)

  readonly PartiesEnum = PartiesEnum

  constructor(
    private pollsService: PollsService,
  ) { }

  ngOnInit() {
    this.getNewestPoll();
  }

  private getNewestPoll() {
    this.pollsService.getNewestPollParty().subscribe({
      next: docs => {
        docs.forEach(doc => {
          this.poll.next(doc.data() as PollModel);
        })
      },
    })
  }
}
