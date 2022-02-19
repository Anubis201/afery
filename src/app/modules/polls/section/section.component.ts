import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {
  @Input() key: PollDataEnum
  @Input() polls: PollModel[]
  @Input() reachedMaxPolls: boolean
  @Input() isLoading: boolean

  @Output() handlePage = new EventEmitter<void>()

  readonly PollDataEnum = PollDataEnum

  identify(index: number, item: PollModel){
    return item.id;
  }
}
