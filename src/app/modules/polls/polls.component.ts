import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollsComponent implements OnInit {
  allPolls = new BehaviorSubject<PollModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)
  showMore = new BehaviorSubject<boolean>(false)

  private lastItemSnapshot = null
  readonly PollDataArray = ConvertEnum(PollDataEnum, 'string')
  private readonly limit = 6

  constructor(
    private pollsService: PollsService,
    private meta: Meta,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.PollDataArray.forEach(element => {
      this.getPolls(element);
    })

    this.metaTags();
  }

  getPolls(pollData: string, isMore = false) {
    this.isLoading.next(true);
    this.pollsService.getPolls(this.limit + 1, isMore, this.lastItemSnapshot, PollDataEnum[pollData]).subscribe({
      next: docs => {
        let data: PollModel[] = [];
        let i = 0;

        docs.forEach(d => {
          data.push({ ...d.data() as PollModel, when: (d.data() as any).when.toDate(), id: d.id })
          if (this.limit - 1 === i) this.lastItemSnapshot = d;
          i++;
        })

        if (data.length === this.limit + 1) {
          this.showMore.next(true);
          data.pop();
        } else {
          this.showMore.next(false);
        }

        this.allPolls.next([
          ...this.allPolls.value,
          ...data,
        ]);
        this.isLoading.next(false);
      },
      error: err => {
        console.log(err)
        this.isLoading.next(false)
      }
    })
  }

  private metaTags() {
    this.titleService.setTitle('Sondaże i badania');
    this.meta.updateTag({ name:'description', content:'Tu znajdziesz najnowsze sondaże polskich partii. Zapraszam na inne strony, gdzie zobaczysz afery naszej "niesamowitej" polityki.' }, "name='description'");
  }
}
