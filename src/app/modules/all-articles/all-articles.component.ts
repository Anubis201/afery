import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { ConvertEnum } from 'src/app/services/global/support-functions/convert-enum';

// jesli cos tu dodajesz pamietaj aby zmienic createPageTree()
interface SectionModel {
  articles: ArticleModel[]
  lastArticlesnapshot: any
  isLastPage: boolean
  isLoading: boolean
}

type DataType = {
  [key in ArticlesTypesEnum]: SectionModel
}

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllArticlesComponent implements OnInit {
  data = new BehaviorSubject<DataType>(this.createPageTree() as DataType)

  order: OrderEnum

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  private readonly limit = 5

  constructor(
    private articlesService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(({ order }) => {
      order = order ?? OrderEnum.Latest;

      if (order !== this.order) this.data.next(this.createPageTree() as DataType)

      // Pobiera 4 artykuły z kategori parti
      this.getArticles(ArticlesTypesEnum.PoliticalParties, order);
      // Pobiera 4 artykuły z kategori polityycy
      this.getArticles(ArticlesTypesEnum.Politicians, order);

      this.titleService.setTitle('Afery - Polityka i Sondaże')
    })
  }

  getArticles(type: ArticlesTypesEnum,  order: OrderEnum) {
    this.changeSectionLoading(type, true);
    let lastItem: Date | number | null = null;

    // przypisz snapshot
    if (this.data.value[type].articles.length) lastItem = this.data.value[type].lastArticlesnapshot

    this.articlesService
      .getArticles(type, this.limit, order, lastItem)
      .subscribe({
        next: doc => {
          let articles: ArticleModel[] = [];
          let i = 0;
          let snap: any;

          // bobiera dane
          doc.forEach(value => {
            articles.push({
              ...value.data() as ArticleModel,
              id: value.id,
              createDate: (value.data() as any).createDate.toDate()
            });

            if (this.limit - 1 === i) snap = value

            i++;
          })

          //  sprawdza czy wyswietlic przcisk "wjecej"
          let isLimit = true;
          if (articles.length === this.limit) {
            articles.pop();
            isLimit = false;
          }

          // zapisuje potrzebne dane
          this.data.next({
            ...this.data.value,
            [type]: {
              articles: [...this.data.value[type].articles, ...articles],
              lastArticlesnapshot: snap,
              isLastPage: isLimit,
              isLoading: false
            }
          })
          this.order = order;
        },
        error: () => {
          this.changeSectionLoading(type, false);
        },
      });
  }

  private changeSectionLoading(type: ArticlesTypesEnum, isLoading: boolean) {
    this.data.next({
      ...this.data.value,
      [type]: {
        ...this.data.value[type],
        isLoading,
      }
    })
  }

  private createPageTree() {
    const object = {}

    ConvertEnum(ArticlesTypesEnum, 'string').forEach((value: ArticlesTypesEnum) => {
      object[value] = {
        articles: [],
        lastArticlesnapshot: null,
        isLastPage: false,
        isLoading: false,
      }
    })

    return object;
  }
}
