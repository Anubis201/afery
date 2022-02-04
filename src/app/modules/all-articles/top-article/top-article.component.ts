import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-article',
  templateUrl: './top-article.component.html',
  styleUrls: ['./top-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArticleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
