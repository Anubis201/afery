import { Component, Input } from '@angular/core';
import { NavModel } from 'src/app/models/articles/nav.model';

@Component({
  selector: 'app-navigation-bar-only-pc',
  templateUrl: './navigation-bar-only-pc.component.html',
  styleUrls: ['./navigation-bar-only-pc.component.scss']
})
export class NavigationBarOnlyPcComponent {
  @Input() items: NavModel[]

  activeLink = '/'
}
