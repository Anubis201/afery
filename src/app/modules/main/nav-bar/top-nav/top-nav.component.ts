import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopNavComponent {
  @Input() isAdmin: boolean
  @Input() isOpenMenu: boolean
  @Input() isLogin: boolean

  @Output() logout = new EventEmitter<void>()
  @Output() handleMenuNav = new EventEmitter<void>()
  @Output() login = new EventEmitter<void>()
}
