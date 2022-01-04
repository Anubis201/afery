import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { PartiesEnum } from 'src/app/models/articles/enums/parties.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { CommentsService } from 'src/app/services/collections/comments/comments.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit {
  article = new BehaviorSubject<ArticleModel | null>(null)
  isExists = new BehaviorSubject<boolean>(true)

  readonly PartiesEnum = PartiesEnum
  readonly ArticlesTypesEnum = ArticlesTypesEnum

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ articleId }) => {
      this.getData(articleId)
    })
  }

  handleAddComment(comment: { name: string, comment: string }) {
    this.commentsService.addComents()
  }

  private getData(articleId: string) {
    this.articlesService.getArticle(articleId).subscribe(article => {
      if (article.exists) {
        this.article.next({ ...article.data() as ArticleModel, id: article.id, createDate: (article.data() as any).createDate.toDate() });
      } else this.isExists.next(false)
    })
  }
}
