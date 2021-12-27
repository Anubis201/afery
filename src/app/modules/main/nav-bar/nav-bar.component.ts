import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

  constructor(private userService: UserService) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  logout() {
    this.userService.logout()
  }
}
