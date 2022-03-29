import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartPageComponent {
  @Input() isLogin: boolean

  @Output() start = new EventEmitter<void>()

  readonly pollDataEnumArray = ConvertEnum(PartiesEnum, 'string')
  readonly PartiesEnum = PartiesEnum
}
