import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ViewPullEnum } from 'src/app/models/polls/enums/view-pull.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseTypeComponent {
  @Input() typeDataControl: FormControl
  @Input() viewTypeControl: FormControl

  readonly PollDataTypeArray = ConvertEnum(PollDataEnum, 'string')
  readonly ViewPullArray = ConvertEnum(ViewPullEnum, 'string')
  readonly PollDataEnum = PollDataEnum
  readonly ViewPullEnum = ViewPullEnum
}
