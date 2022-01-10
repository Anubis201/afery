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
  lastpartieSnapshot: any
  reachedMaxArticlesParties = new BehaviorSubject<boolean>(false)

  politicians = new BehaviorSubject<ArticleModel[]>([])
  lastpoliticSnapshot: any
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
    switch(type) {
      case ArticlesTypesEnum.PoliticalParties:
        lastItem = this.lastpartieSnapshot;
        break;
      case ArticlesTypesEnum.Politicians:
        lastItem = this.lastpoliticSnapshot;
        break;
    }
    }

    this.articlesService
      .getArticles(type, this.limit, order, lastItem)
      .subscribe({
        next: doc => {
          let articles: ArticleModel[] = [];
          let i = 0;

          doc.forEach(value => {
            articles.push({
              ...value.data() as ArticleModel,
              id: value.id,
              createDate: (value.data() as any).createDate.toDate()
            });

            if (this.limit - 1 === i) {
              switch(type) {
                case ArticlesTypesEnum.PoliticalParties:
                  this.lastpartieSnapshot = value;
                  break;
                case ArticlesTypesEnum.Politicians:
                  this.lastpoliticSnapshot = value;
                  break;
              }
            }

            i++;
          })

          let isLimit = true;
          if (articles.length === this.limit) {
            articles.pop();
            isLimit = false;
          }

          switch(type) {
            case ArticlesTypesEnum.PoliticalParties:
              this.parties.next([...this.parties.value, ...articles]);
              this.reachedMaxArticlesParties.next(isLimit);
              break;
            case ArticlesTypesEnum.Politicians:
              this.politicians.next([...this.politicians.value, ...articles]);
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
    this.parties.next([]);

    this.reachedMaxArticlesPoliticians.next(false);
    this.politicians.next([]);
  }
}
