import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { PollDataEnum } from 'src/app/models/polls/enums/poll-data.enum';
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

  entityItems = new BehaviorSubject<PartiesEnum[]>(ConvertEnum(PartiesEnum, 'number'))

  readonly PartiesEnum = PartiesEnum
  readonly PollDataEnum = PollDataEnum
}
