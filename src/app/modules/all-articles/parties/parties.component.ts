import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['.././all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
