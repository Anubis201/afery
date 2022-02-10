import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-pc',
  templateUrl: './poll-pc.component.html',
  styleUrls: ['./poll-pc.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PollPcComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
