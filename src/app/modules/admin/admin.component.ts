import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

  constructor(private userService: UserService) { }

  get isAdmin() {
    return this.userService.isAdmin
  }
}
