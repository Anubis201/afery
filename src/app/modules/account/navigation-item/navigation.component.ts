import { ChangeDetectionStrategy, Component } from '@angular/core';

interface itemsModel {
  title: string
  desc: string
  href: string
  icon: string
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  items: itemsModel[] = [
    {
      title: 'Ustawienia',
      desc: '',
      href: '../ustawienia',
      icon: 'manage_accounts'
    }
  ]
}
