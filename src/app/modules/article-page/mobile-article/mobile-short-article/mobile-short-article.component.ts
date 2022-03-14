import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';

@Component({
  selector: 'app-mobile-short-article',
  templateUrl: './mobile-short-article.component.html',
  styleUrls: ['./mobile-short-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileShortArticleComponent {
  @Input() article: ArticleModel

  get toArticlePage() {
    return `/artykul/${this.article.id}/${ChangePolishChars(this.article.title)}`
  }
}
