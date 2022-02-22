import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-choose-type',
  templateUrl: './choose-type.component.html',
  styleUrls: ['./choose-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChooseTypeComponent {
  @Input() typeDataControl: FormControl

  readonly PollDataTypeArray = ConvertEnum(PollDataEnum, 'string')
  readonly PollDataEnum = PollDataEnum
}
