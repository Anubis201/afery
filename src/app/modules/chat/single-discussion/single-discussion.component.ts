import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-discussion',
  templateUrl: './single-discussion.component.html',
  styleUrls: ['./single-discussion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleDiscussionComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
