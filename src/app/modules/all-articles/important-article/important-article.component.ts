import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';
import { ShortArticleComponent } from '../../shared/short-article/short-article.component';

@Component({
  selector: 'app-important-article',
  templateUrl: './important-article.component.html',
  styleUrls: ['./important-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportantArticleComponent {
  @Input() article: ArticleModel

  get toArticlePage() {
    return `/artykul/${this.article.id}/${ChangePolishChars(this.article.title)}`
  }

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  constructor(private dialog: MatDialog) {}

  seeComments() {
    this.dialog.open(ShortArticleComponent, {
      data: {
        article: this.article,
        link: this.toArticlePage
      }
    });
  }
}
