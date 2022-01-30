import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';
import { ChangePolishChars } from 'src/app/services/global/support-functions/change-polish-chars';

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

  constructor(private commentsService: CommentsService) {}

  get toArticlePage() {
    return `/artykul/${this.article.id}/${ChangePolishChars(this.article.title)}`
  }

  ngOnInit() {
    this.getCountComments();
  }

  private getCountComments() {
    this.commentsService.getComments(this.article.id).subscribe({
      next: docs => {
        this.countComments.next(docs.size);
      },
    })
  }
}
