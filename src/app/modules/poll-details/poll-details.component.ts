import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollDetailsComponent implements OnInit {
  data = new BehaviorSubject<PollModel>(null)

  constructor(
    private pollsService: PollsService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.router.params.subscribe(({ id, title }: { id: string, title: string }) => {
      this.getData(id);
    })
  }

  private getData(id: string) {
    this.pollsService.getSinglePoll(id).subscribe({
      next: doc => {
        this.data.next({
          ...doc.data() as PollModel,
          when: (doc.data() as any).when.toDate(),
          id: doc.id,
        })
      },
    })
  }
}
