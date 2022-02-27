import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';

@Component({
  selector: 'app-mobile-article',
  templateUrl: './mobile-article.component.html',
  styleUrls: ['./mobile-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileArticleComponent {
  @Input() article: ArticleModel
  @Input() actionMode: 'like' | 'dislike' | null
  @Input() isAdmin: boolean
  @Input() nextArticle: ArticleModel

  @Output() approve = new EventEmitter<void>()
  @Output() dislike = new EventEmitter<void>()

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  pageUrl() {
    return location.href
  }
}
