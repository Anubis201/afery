import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { NavModel } from 'src/app/models/articles/nav.model';

@Component({
  selector: 'app-navigation-bar-only-pc',
  templateUrl: './navigation-bar-only-pc.component.html',
  styleUrls: ['./navigation-bar-only-pc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarOnlyPcComponent {
  @Input() items: NavModel[]

  readonly OrderEnum = OrderEnum
}
