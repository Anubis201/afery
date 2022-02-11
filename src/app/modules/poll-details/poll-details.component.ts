import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.component.html',
  styleUrls: ['./poll-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
