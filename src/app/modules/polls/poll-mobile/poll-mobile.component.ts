import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-mobile',
  templateUrl: './poll-mobile.component.html',
  styleUrls: ['./poll-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollMobileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
