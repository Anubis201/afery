import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PartyCharModel } from 'src/app/models/articles/party-char.model';
import { PollModel } from 'src/app/models/polls/poll.model';

interface CharDataModel {
  party: PartiesEnum,
  percentage: number,
  time: Date,
}

@Component({
  selector: 'app-avarage',
  templateUrl: './avarage.component.html',
  styleUrls: ['./avarage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvarageComponent {
  @Input() set polls (polls: PollModel[]) {
    if (!polls.length) return

    this.prepareData(polls);
    this.convertDataToChart();
  }

  private charData: CharDataModel[] = []
  private data: { time: Date, parties: PartyCharModel[] }[] = []

  private convertDataToChart() {
    this.data.forEach(toConvert => {
      const helpVariable = [];
      helpVariable.push(toConvert.parties.map(e => ({
        ...e,
        time: toConvert.time,
      })))
      this.charData = [...this.charData, ...helpVariable[0]]
    })
  }

  private setDefualtParties(poll: PollModel) {
    return poll.parties.map(ele => ({ ...ele, percentage: 0 }))
  }

  private getValue(monthAvarage: PartyCharModel[], countItem: number) {
    return monthAvarage.map(e => ({ ...e, percentage: e.percentage as number / countItem }))
  }

  private addTick(time: Date, monthAvarage: PartyCharModel[], countItem: number) {
    this.data.push({
      time,
      parties: this.getValue(monthAvarage, countItem),
    });
  }

  private prepareData(polls: PollModel[]) {
    let time: Date = polls[0].when;
    let monthAvarage: PartyCharModel[] = this.setDefualtParties(polls[0]);
    let countItem = 0;

    polls.forEach((element, index) => {
      element.when.setDate(1);
      const isLast = index === polls.length - 1;

      if (element.when.getTime() !== time?.getTime()) {
        this.addTick(time, monthAvarage, countItem);
        time = element.when;
        monthAvarage = this.setDefualtParties(polls[0]);
        countItem = 0;
      }

      countItem++;
      monthAvarage = element.parties.map(el => ({
        ...el,
        percentage: (monthAvarage.find(f => f.party === el.party)?.percentage as number) + (el.percentage as number),
      }));

      if (!isLast) return

      if (this.data[this.data.length - 1].time.getTime() !== element.when.getTime())
        this.addTick(time, monthAvarage, countItem);
      else
        this.data[this.data.length - 1].parties = monthAvarage;
    })
  }
}
