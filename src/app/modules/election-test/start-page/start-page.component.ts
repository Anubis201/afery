import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';
import { LoginComponent } from '../../shared/login/login.component';

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

  constructor(private dialog: MatDialog) {}

  readonly pollDataEnumArray = ConvertEnum(PartiesEnum, 'string')
  readonly PartiesEnum = PartiesEnum

  openSingIn() {
    this.dialog.open(LoginComponent);
  }
}
