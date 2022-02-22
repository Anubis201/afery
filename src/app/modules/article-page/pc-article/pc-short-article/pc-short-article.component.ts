import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Component({
  selector: 'app-pc-short-article',
  templateUrl: './pc-short-article.component.html',
  styleUrls: ['./pc-short-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PcShortArticleComponent {
  @Input() article: ArticleModel
  @Input() actionMode: 'like' | 'dislike' | null

}
