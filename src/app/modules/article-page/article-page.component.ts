import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { ImagesService } from 'src/app/services/collections/images/images.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit {
  article = new BehaviorSubject<ArticleModel | null>(null)
  isExists = new BehaviorSubject<boolean>(false)

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private imagesService: ImagesService,
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
        this.getImage(article.id)
      } else this.isExists.next(false)
    })
  }

  private getImage(articleId: string) {
    this.imagesService.getImage(articleId).subscribe({
      next: imageSrc => {
        if (this.article.value) this.article.next({ ...this.article.value, imageSrc });
      }
    })
  }
}
