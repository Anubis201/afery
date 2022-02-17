import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-poll-item',
  templateUrl: './poll-item.component.html',
  styleUrls: ['./poll-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollItemComponent {
  @Input() items: FormArray

  @Output() addItem = new EventEmitter<void>()
  @Output() deleteItem = new EventEmitter<number>()

  entityItems = new BehaviorSubject<PartiesEnum[]>(ConvertEnum(PartiesEnum, 'number'))

  readonly PartiesEnum = PartiesEnum
}
