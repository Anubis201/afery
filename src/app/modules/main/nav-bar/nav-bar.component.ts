import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NavModel } from 'src/app/models/articles/nav.model';
import { UserService } from 'src/app/services/global/user/user.service';
import { LoginComponent } from '../../shared/login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  @Input() isOpenMenu: boolean | null
  @Input() items: NavModel[]

  @Output() handleMenu = new EventEmitter<void>()

  hasOrderParam = false
  isAdminPage = new BehaviorSubject<boolean>(false)

  ngOnInit() {
    this.route.events.subscribe(() => {
      this.isAdminPage.next(location.pathname.split('/')[1] === 'admin')
    })
  }

  constructor(
    private userService: UserService,
    private route: Router,
    private dialog: MatDialog
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get isLogin() {
    return this.userService.isLogin
  }

  login() {
    this.dialog.open(LoginComponent);
  }

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/')
  }
}
