import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Component({
  selector: 'app-important-article',
  templateUrl: './important-article.component.html',
  styleUrls: ['./important-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportantArticleComponent {
  @Input() article: ArticleModel
}
