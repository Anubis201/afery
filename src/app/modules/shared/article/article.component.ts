import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent {
  @Input() article: ArticleModel

  readonly PartiesEnum = PartiesEnum
  readonly ArticlesTypesEnum = ArticlesTypesEnum

  get toArticlePage() {
    return `${location.href}/artykul/${this.article.id}/${ChangePolishChars(this.article.title)}`
  }
}
