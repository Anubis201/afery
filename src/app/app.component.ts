import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isOpenMenu = new BehaviorSubject<boolean>(false)

  handleMenu() {
    this.isOpenMenu.next(!this.isOpenMenu.value)
  }
}
