import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

interface itemsModel {
  title: string
  desc: string
  href: string
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
      title: '',
      desc: '',
      href: ''
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
