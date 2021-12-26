import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  ngOnInit(): void {
  }

}
