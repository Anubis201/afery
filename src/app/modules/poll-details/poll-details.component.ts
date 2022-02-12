import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { Election2019 } from 'src/app/services/global/data/election-2019';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollDetailsComponent implements OnInit {
  data = new BehaviorSubject<PollModel>(null)
  previousData = new BehaviorSubject<PollModel>(null)
  sortingMethod = new BehaviorSubject<'poll' | 'election'>('election')

  private dataSnapshot: any

  constructor(
    private pollsService: PollsService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(({ id, title }: { id: string, title: string }) => {
      this.getData(id);
      this.previousElection();
    })
  }

  previousPoll() {
    this.pollsService.getPreviousPoll(this.data.value.surveying, this.dataSnapshot).subscribe({
      next: data => {
        this.previousData.next(data);
        this.sortingMethod.next('poll');
      },
    })
  }

  previousElection() {
    this.previousData.next(Election2019);
    this.sortingMethod.next('election');
  }

  private getData(id: string) {
    this.pollsService.getSinglePoll(id).subscribe({
      next: doc => {
        this.dataSnapshot = doc;
        this.data.next({
          ...doc.data() as PollModel,
          when: (doc.data() as any).when.toDate(),
          id: doc.id,
        })
      },
    })
  }
}
