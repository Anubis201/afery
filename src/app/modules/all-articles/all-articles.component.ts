import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllArticlesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
