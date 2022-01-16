import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface Menu {
  href: string
  text: string
  icon: string
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuListComponent implements OnInit {
  items: Menu[]

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        href: 'create',
        text: 'Stwórz',
        icon: 'mail_outline'
      },
      {
        href: 'comments',
        text: 'Komentarze',
        icon: 'comment'
      }
    ]
  }
}
