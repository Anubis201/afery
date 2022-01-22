import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-avarage',
  templateUrl: './avarage.component.html',
  styleUrls: ['./avarage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvarageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
