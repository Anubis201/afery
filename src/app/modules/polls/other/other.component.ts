import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherComponent {

  constructor() { }

  ngOnInit() {
  }

}
