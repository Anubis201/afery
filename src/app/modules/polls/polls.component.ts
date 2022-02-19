import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PollModel } from 'src/app/models/polls/poll.model';
import { PollsService } from 'src/app/services/collections/polls/polls.service';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

interface SectionPollModel {
  polls: PollModel[]
  lastPollsnapshot: any
  isLastPage: boolean
  isLoading: boolean
}

type DataType = Record<PollDataEnum, SectionPollModel>;

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollsComponent implements OnInit {
  data = new BehaviorSubject<DataType>(this.createPage() as DataType)
  showMore = new BehaviorSubject<boolean>(false)

  private readonly limit = 6

  constructor(
    private pollsService: PollsService,
    private meta: Meta,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.metaTags();
  }

  getPolls(pollData: PollDataEnum, isMore = false) {
    this.pollsService.getPolls(this.limit + 1, isMore, this.data.value[pollData].lastPollsnapshot, pollData).subscribe({
      next: docs => {
        let data: PollModel[] = [];
        let i = 0;
        let snapshot: any;

        docs.forEach(d => {
          data.push({ ...d.data() as PollModel, when: (d.data() as any).when.toDate(), id: d.id })
          if (this.limit - 1 === i) snapshot = d;
          i++;
        })

        if (data.length === this.limit + 1) {
          this.showMore.next(true);
          data.pop();
        } else {
          this.showMore.next(false);
        }

        this.data.next({
          ...this.data.value,
          [type]: {
            articles: orderChange ? articles : [...this.data.value[type].articles, ...articles],
            lastArticlesnapshot: snap,
            order: orderChange || this.data.value[type].order,
            isLastPage: isLimit,
            isLoading: false
          }
        })
      },
      error: () => this.changeLoading(pollData, false)
    })
  }

  private changeLoading(type: PollDataEnum, isLoading: boolean) {
    this.data.next({
      ...this.data.value,
      [type]: {
        ...this.data.value[type],
        isLoading,
      }
    })
  }

  private metaTags() {
    this.titleService.setTitle('Sondaże i badania');
    this.meta.updateTag({ name:'description', content:'Tu znajdziesz najnowsze sondaże polskich partii. Zapraszam na inne strony, gdzie zobaczysz afery naszej "niesamowitej" polityki.' }, "name='description'");
  }

  private createPage() {
    const object = {}

    ConvertEnum(PollDataEnum, 'number').forEach((value: PollDataEnum) => {
      object[value] = {
        polls: [],
        lastPollsnapshot: null,
        isLastPage: false,
        isLoading: false,
      }
    })

    return object;
  }
}
