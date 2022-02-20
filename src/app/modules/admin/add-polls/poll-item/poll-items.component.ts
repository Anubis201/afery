import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
import { PresidentsEnum } from 'src/app/models/polls/enums/presidents.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-poll-items',
  templateUrl: './poll-items.component.html',
  styleUrls: ['./poll-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollItemsComponent {
  @Input() items: FormArray
  @Input() typeDataControl: FormControl

  @Output() addItem = new EventEmitter<void>()
  @Output() deleteItem = new EventEmitter<number>()

  readonly entityItems = ConvertEnum(PartiesEnum, 'number')
  readonly presidents = ConvertEnum(PresidentsEnum, 'number')

  readonly PartiesEnum = PartiesEnum
  readonly PollDataEnum = PollDataEnum
  readonly PresidentsEnum = PresidentsEnum

  presidentName(president: string) {
    return president.split(/(?=[A-Z])/).join(' ')
  }
}
