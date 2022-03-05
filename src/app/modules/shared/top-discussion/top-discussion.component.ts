import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-discussion',
  templateUrl: './top-discussion.component.html',
  styleUrls: ['./top-discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopDiscussionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
