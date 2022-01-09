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
  politicians = new BehaviorSubject<ArticleModel[]>([])
  pageParties = new BehaviorSubject<number>(1)
  pagePoliticians = new BehaviorSubject<number>(1)
  order: OrderEnum

  readonly ArticlesTypesEnum = ArticlesTypesEnum

  constructor(
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ order }) => {
      order = order ?? OrderEnum.Latest;
      // Pobiera 4 artykuły z kategori parti
      this.getArticles(ArticlesTypesEnum.PoliticalParties, order, this.pageParties.value);
      // Pobiera 4 artykuły z kategori polityycy
      this.getArticles(ArticlesTypesEnum.Politicians, order, this.pagePoliticians.value);
    })
  }

  getArticles(type: ArticlesTypesEnum,  order: OrderEnum, page: number) {
    let lastItem: Date | string = '';

    if (page !== 1) {
      switch(type) {
        case ArticlesTypesEnum.PoliticalParties:
          if (page > this.pageParties.value) {
            // jesli jest kolejna strona
            lastItem = this.parties.value[this.parties.value.length - 1].createDate;
          } else {
            // jesli sie cofamy
            lastItem = this.parties.value[0].createDate;
          }
          break;
        case ArticlesTypesEnum.Politicians:
          if (page > this.pagePoliticians.value) {
            // jesli jest kolejna strona
            lastItem = this.politicians.value[this.parties.value.length - 1].createDate;
          } else {
            // jesli sie cofamy
            lastItem = this.politicians.value[0].createDate;
          }
          break;
      }
    }

    this.articlesService
      .getArticles(type, 4, order, lastItem)
      .subscribe({
        next: doc => {
          doc.forEach(value => {
            const article: ArticleModel = { ...value.data() as ArticleModel, id: value.id, createDate: (value.data() as any).createDate.toDate() };

            if (this.order !== order) {
              this.parties.next([]);
              this.politicians.next([]);
            }

            switch(type) {
              case ArticlesTypesEnum.PoliticalParties:
                this.parties.next([...this.parties.value, article]);
                this.pageParties.next(page);
                break;
              case ArticlesTypesEnum.Politicians:
                this.politicians.next([...this.politicians.value, article]);
                this.pagePoliticians.next(page);
                break;
            }

            this.order = order;
          })
        },
        error: (err) => {
          console.log(err)
          this._snackBar.open('Błąd! Skontaktuj się z pomocą techniczną', 'close');
        },
      });
  }
}
