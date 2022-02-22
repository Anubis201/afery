import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PollModel } from 'src/app/models/polls/poll.model';

@Component({
  selector: 'app-poll-carousel',
  templateUrl: './poll-carousel.component.html',
  styleUrls: ['./poll-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollCarouselComponent {
  @Input() slides: PollModel[]

  readonly PollDataEnum = PollDataEnum
}
