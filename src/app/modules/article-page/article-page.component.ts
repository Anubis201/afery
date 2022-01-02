import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit {
  article = new BehaviorSubject<ArticleModel | null>(null)
  isExists = new BehaviorSubject<boolean>(true)

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(({ articleId }) => {
      this.getData(articleId)
    })
  }

  private getData(articleId: string) {
    this.articlesService.getArticle(articleId).subscribe(article => {
      if (article.exists) {
        this.article.next({ ...article.data() as ArticleModel, id: article.id, createDate: (article.data() as any).createDate.toDate() });
      } else this.isExists.next(false)
    })
  }
}
