import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface itemsModel {
  title: string
  desc: string
  href: string
  icon: string
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  items: itemsModel[] = [
    {
      title: 'Ustawienia',
      desc: '',
      href: 'ustawienia',
      icon: 'manage_accounts'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
