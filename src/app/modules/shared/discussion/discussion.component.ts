import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscussionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
