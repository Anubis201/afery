import { Component } from '@angular/core';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';

@Component({
  selector: 'app-navigation-bar-only-pc',
  templateUrl: './navigation-bar-only-pc.component.html',
  styleUrls: ['./navigation-bar-only-pc.component.scss']
})
export class NavigationBarOnlyPcComponent {
  get hasOrderParam() {
    return new URLSearchParams(window.location.search).has('order')
  }

  readonly OrderEnum = OrderEnum
}
