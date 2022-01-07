import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NavModel } from 'src/app/models/articles/nav.model';
import { UserService } from 'src/app/services/global/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {
  @Input() isOpenMenu: boolean | null

  @Output() handleMenu = new EventEmitter<void>()

  items: NavModel[]

  constructor(
    private userService: UserService,
    private route: Router,
  ) { }

  get isAdmin() {
    return this.userService.isAdmin
  }

  get isAdminPage() {
    return location.pathname.split('/')[1] === 'admin'
  }

  ngOnInit() {
    this.items = [
      {
        label: 'Najważniejsze',
        href: '/',
      },
    ]
  }

  logout() {
    this.userService.logout();
    this.route.navigateByUrl('/')
  }
}
