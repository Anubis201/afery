import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  constructor(
    private userService: UserService
  ) { }

  logiAsGoogle() {
    this.userService.loginAsGoogle()
  }
}
