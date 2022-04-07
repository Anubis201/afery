import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';
import { ShortArticleComponent } from '../short-article/short-article.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
  @Input() article: ArticleModel
  @Input() fakeMobileVersion = false

  countComments = new BehaviorSubject<number>(0)

  readonly PartiesEnum = PartiesEnum
  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly ArticleWriteEnum = ArticleWriteEnum

  constructor(
    private commentsService: CommentsService,
    private dialog: MatDialog,
  ) {}

  get toArticlePage() {
    return `/artykul/${this.article.id}/${ChangePolishChars(this.article.title)}`
  }

  ngOnInit() {
    this.getCountComments();
  }

  seeComments() {
    this.dialog.open(ShortArticleComponent, {
      data: {
        article: this.article,
        link: this.toArticlePage
      }
    });
  }

  private getCountComments() {
    this.commentsService.getComments(this.article.id, 'articles').subscribe({
      next: docs => {
        this.countComments.next(docs.size);
      },
    })
  }
}
