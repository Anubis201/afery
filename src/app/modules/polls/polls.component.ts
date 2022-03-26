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

type DataType = Record<PollDataEnum, SectionPollModel>

@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollsComponent implements OnInit {
  private readonly pollDataEnumArray = ConvertEnum(PollDataEnum, 'number')

  data = new BehaviorSubject<DataType>(this.createPage() as DataType)

  private readonly limit = 3

  get slides() {
    return [this.data.value[0].polls[0], this.data.value[2].polls[0]]
  }

  constructor(
    private pollsService: PollsService,
    private meta: Meta,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.metaTags();

    this.getPolls(PollDataEnum.Partie);
    this.getPolls(PollDataEnum.Prezydenci);
    this.getPolls(PollDataEnum.Inne);
  }

  identify(index: number, item){
    return item.key;
  }

  getPolls(type: PollDataEnum, isMore = false) {
    this.changeLoading(type, true);
    this.pollsService.getPolls(this.limit + 1, isMore, this.data.value[type].lastPollsnapshot, type).subscribe({
      next: docs => {
        let polls: PollModel[] = [];
        let i = 0;
        let snapshot: any;

        docs.forEach(d => {
          polls.push({ ...d.data() as PollModel, when: (d.data() as any).when.toDate(), id: d.id })
          if (this.limit - 1 === i) snapshot = d;
          i++;
        })

        let isLimit = true;
        if (polls.length === this.limit + 1) {
          isLimit = false;
          polls.pop();
        }

        this.data.next({
          ...this.data.value,
          [type]: {
            polls: [...this.data.value[type].polls, ...polls],
            lastPollsnapshot: snapshot,
            isLastPage: isLimit,
            isLoading: false
          }
        })
      },
      error: () => this.changeLoading(type, false)
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
    this.titleService.setTitle('Sondaże i badania - Afery');
    this.meta.updateTag({ name:'description', content:'Tu znajdziesz najnowsze sondaże przedwyborcze polskich partii, wyborów prezydenckich oraz inne sondaże.' }, "name='description'");
  }

  private createPage() {
    const object = {}

    this.pollDataEnumArray.forEach((value: PollDataEnum) => {
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
