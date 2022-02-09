import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartiesComponent {
  @Input() items: FormArray

  @Output() addItem = new EventEmitter<void>()
  @Output() deleteItem = new EventEmitter<number>()

  entityItems = new BehaviorSubject<PartiesEnum[]>(ConvertEnum(PartiesEnum, 'number'))

  readonly PartiesEnum = PartiesEnum
}
