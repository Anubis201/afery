import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PollModel } from 'src/app/models/polls/poll.model';
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
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.getPolls();
    this.metaTags();
  }

  private getPolls() {
    this.isLoading.next(true);
    this.pollsService.getPolls().subscribe({
      next: docs => {
        this.isLoading.next(false);
        let data: PollModel[] = [];
        docs.forEach(d =>{
          data.push({ ...d.data() as PollModel, when: (d.data() as any).when.toDate() })
        })
        this.allPolls.next(data);
      },
      error: () => {
        this.isLoading.next(false);
      }
    })
  }

  private metaTags() {
    this.meta.addTags([
      { name: 'description', content: 'Tu znajdziesz średnią oraz najnowsze sondaże polskich partii.' },
    ])
  }
}
