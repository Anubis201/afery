import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('menu', [
      transition (':enter', [
        style ({ transform: 'translateX(-100vw)' }),
        animate ('200ms',
          style ({ transform: 'translateX(0)' }),
        ),
      ]),
      transition (':leave', [
        animate ('200ms',
          style ({ transform: 'translateX(-100vw)' }),
        ),
      ]),
    ])
  ]
})
export class AppComponent {
  isOpenMenu = new BehaviorSubject<boolean>(false)

  handleMenu() {
    this.isOpenMenu.next(!this.isOpenMenu.value)
  }
}
