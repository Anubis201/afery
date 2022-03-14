import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { showAnimation } from 'src/app/services/animations/others.animations';

@Component({
  selector: 'app-top-articles',
  templateUrl: './top-articles.component.html',
  styleUrls: ['./top-articles.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopArticlesComponent {
  @Input() importantArticle: ArticleModel
  @Input() restArticle: ArticleModel[]
}
