import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ModalService } from 'src/app/services/global/modal/modal.service';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartPageComponent {
  @Input() isLogin: boolean
  @Input() length: number

  @Output() start = new EventEmitter<void>()

  constructor(private modal: ModalService) {}

  readonly pollDataEnumArray = ConvertEnum(PartiesEnum, 'string')
  readonly PartiesEnum = PartiesEnum

  openSingIn() {
    this.modal.openSignIn();
  }
}
