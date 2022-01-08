import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { OrderEnum } from './models/articles/enums/order.enum';
import { NavModel } from './models/articles/nav.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menu', [
      transition (':enter', [
        style ({ transform: 'translateX(-100vw)' }),
        animate ('300ms',
          style ({ transform: 'translateX(0)' }),
        ),
      ]),
      transition (':leave', [
        animate ('300ms',
          style ({ transform: 'translateX(-100vw)' }),
        ),
      ]),
    ])
  ]
})
export class AppComponent implements OnInit {
  items: NavModel[]
  isOpenMenu = new BehaviorSubject<boolean>(false)

  constructor(
    private route: Router,
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Najnowsze',
        href: '/',
      },
      {
        label: 'Popularne',
        href: '/',
        queryParams: {
          order: OrderEnum.Popular,
        }
      },
    ]

    this.route.events.subscribe(() => {
      this.isOpenMenu.next(false);
    })
  }

  handleMenu() {
    this.isOpenMenu.next(!this.isOpenMenu.value)
  }
}
