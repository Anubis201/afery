import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel

  readonly PartiesEnum = PartiesEnum

  constructor() { }

  ngOnInit(): void {
  }

}
