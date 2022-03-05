import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
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

  constructor(
    private route: Router,
    private meta: Meta,
  ) {}

  ngOnInit() {
    this.metaTags();
    this.onAnyRouteChange();
    this.items = [
      {
        label: 'Afery',
        href: '/',
      },
      {
        label: 'Bulwar',
        href: '/bulwar/dyskusje',
      },
      {
        label: 'Sondaże',
        href: '/sondaze',
      },
      {
        label: 'Szukaj',
        href: '/szukaj',
      },
    ]
  }

  handleMenu() {
    this.isOpenMenu.next(!this.isOpenMenu.value)
  }

  private onAnyRouteChange() {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isOpenMenu.next(false);
        window.scrollTo(0, 0);
      }
    })
  }

  private metaTags() {
    this.meta.addTags([
      { name: 'description', content: 'Afery polskich polityków oraz partii. Nie piszemy, kto jest gorszy, ponieważ nikt nam za to nie płaci. Dlatego niech nas ktoś kupi. Błagam!' },
    ])
  }
}
