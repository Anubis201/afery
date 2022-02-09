import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';
import { ShortArticleComponent } from '../../shared/short-article/short-article.component';

@Component({
  selector: 'app-important-article',
  templateUrl: './important-article.component.html',
  styleUrls: ['./important-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportantArticleComponent implements OnInit {
  @Input() article: ArticleModel

  countComments = new BehaviorSubject<number>(0)

  get toArticlePage() {
    return `/artykul/${this.article.id}/${ChangePolishChars(this.article.title)}`
  }

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  readonly PartiesEnum = PartiesEnum

  constructor(
    private dialog: MatDialog,
    private commentsService: CommentsService,
  ) {}

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
    this.commentsService.getComments(this.article.id).subscribe({
      next: docs => {
        this.countComments.next(docs.size);
      },
    })
  }
}
