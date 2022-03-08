import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-mobile-bottom',
  templateUrl: './mobile-bottom.component.html',
  styleUrls: ['./mobile-bottom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileBottomComponent {
  items = [
    {
      icon: 'forum',
      title: 'Bulwar',
    },
    {
      icon: 'house',
      title: 'Afery',
    },
    {
      icon: 'poll',
      title: 'Sondaże',
    },
  ]

}
