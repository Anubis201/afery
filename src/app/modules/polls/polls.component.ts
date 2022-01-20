import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from 'src/app/models/articles/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollsComponent implements OnInit {
  allPolls = new BehaviorSubject<PollModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private pollsService: PollsService,
  ) { }

  ngOnInit() {
    this.getPolls();
  }

  private getPolls() {
    this.isLoading.next(true);
    this.pollsService.getPolls().subscribe({
      next: docs => {
        this.isLoading.next(false);
        let data = [];
        docs.forEach(d =>{
          data.push(d.data())
        })
        this.allPolls.next(data);
      },
      error: () => {
        this.isLoading.next(false);
      }
    })
  }
}
