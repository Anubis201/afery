import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  isAuth = new BehaviorSubject<boolean>(false)

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  logiAsGoogle() {
    this.isAuth.next(true);
    this.userService.loginAsGoogle().subscribe({
      next: () => this.dialog.closeAll(),
      complete: () => this.isAuth.next(false),
    })
  }
}
