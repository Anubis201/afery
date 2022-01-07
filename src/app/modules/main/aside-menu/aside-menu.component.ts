import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavModel } from 'src/app/models/articles/nav.model';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsideMenuComponent {
  @Input() items: NavModel[]
}
