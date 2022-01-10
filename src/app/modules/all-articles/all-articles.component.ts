import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllArticlesComponent implements OnInit {
  parties = new BehaviorSubject<ArticleModel[]>([])
  reachedMaxArticlesParties = new BehaviorSubject<boolean>(false)

  politicians = new BehaviorSubject<ArticleModel[]>([])
  reachedMaxArticlesPoliticians = new BehaviorSubject<boolean>(false)

  order: OrderEnum

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  private readonly limit = 5

  constructor(
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ order }) => {
      order = order ?? OrderEnum.Latest;

      if (order !== this.order) this.resetPageData();

      // Pobiera 4 artykuły z kategori parti
      this.getArticles(ArticlesTypesEnum.PoliticalParties, order);
      // Pobiera 4 artykuły z kategori polityycy
      this.getArticles(ArticlesTypesEnum.Politicians, order);
    })
  }

  getArticles(type: ArticlesTypesEnum,  order: OrderEnum) {
    let lastItem: Date | number | null = null;

    if (this.parties.value.length) {
      const name = order === OrderEnum.Latest ? 'createDate' : 'viewership';
      switch(type) {
        case ArticlesTypesEnum.PoliticalParties:
          lastItem = this.parties.value[this.parties.value.length - 1][name];
          break;
        case ArticlesTypesEnum.Politicians:
          lastItem = this.politicians.value[this.politicians.value.length - 1][name];
          break;
      }
    }

    this.articlesService
      .getArticles(type, this.limit, order, lastItem)
      .subscribe({
        next: doc => {
          let articles: ArticleModel[] = [];

          doc.forEach(value => {
            articles.push({
              ...value.data() as ArticleModel,
              id: value.id,
              createDate: (value.data() as any).createDate.toDate()
            });
          })

          let isLimit = true;
          if (articles.length === this.limit) {
            articles.pop();
            isLimit = false;
          }

          switch(type) {
            case ArticlesTypesEnum.PoliticalParties:
              this.parties.next(articles);
              this.reachedMaxArticlesParties.next(isLimit);
              break;
            case ArticlesTypesEnum.Politicians:
              this.politicians.next(articles);
              this.reachedMaxArticlesPoliticians.next(isLimit);
              break;
          }

          this.order = order;
        },
        error: () => {
          this._snackBar.open('Błąd! Skontaktuj się z pomocą techniczną', 'close');
        },
      });
  }

  private resetPageData() {
    this.reachedMaxArticlesParties.next(false);

    this.reachedMaxArticlesPoliticians.next(false);
  }
}
