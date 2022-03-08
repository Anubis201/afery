import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {
  @Input() title: string
  @Input() desc: string
  @Input() href: string
  @Input() icon: string
}
