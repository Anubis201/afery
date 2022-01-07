import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  ngOnInit() {
    this.items = [
      {
        label: 'Najważniejsze',
        href: '/',
      },
    ]
  }

  handleMenu() {
    this.isOpenMenu.next(!this.isOpenMenu.value)
  }
}
