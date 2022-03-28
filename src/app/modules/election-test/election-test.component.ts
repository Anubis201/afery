import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-election-test',
  templateUrl: './election-test.component.html',
  styleUrls: ['./election-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElectionTestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
