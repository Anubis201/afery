import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-mobile-bottom',
  templateUrl: './mobile-bottom.component.html',
  styleUrls: ['./mobile-bottom.component.scss'],
})
export class MobileBottomComponent implements OnInit {
  items = [
    {
      icon: 'forum',
      title: 'Bulwar',
      href: '/bulwar/dyskusje',
      active: false
    },
    {
      icon: 'house',
      title: 'Afery',
      href: '/',
      active: false
    },
    {
      icon: 'poll',
      title: 'Sondaże',
      href: '/sondaze',
      active: false
    },
  ]

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const pathname = location.pathname;
        this.setALLActiveTofalse();

        switch(pathname) {
          case '/':
            this.items[1].active = true;
            break
          case '/bulwar/dyskusje':
            this.items[0].active = true;
            break
          case '/sondaze':
            this.items[2].active = true;
            break;
        }
      }
    })
  }

  private setALLActiveTofalse() {
    this.items = this.items.map(item => ({ ...item, active: false }))
  }
}
