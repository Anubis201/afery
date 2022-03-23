import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
  order: OrderEnum
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
  topArticle = new BehaviorSubject<ArticleModel>(null)

  readonly ArticlesTypesEnum = ArticlesTypesEnum
  private readonly limit = 5

  constructor(
    private articlesService: ArticlesService,
    private titleService: Title,
    private meta: Meta,
  ) { }

  identify(index: number, item){
    return item.key;
  }

  ngOnInit() {
    this.metaTags();
    this.data.next(this.createPageTree() as DataType)

    this.getTopArticle();

    // Pobiera 4 artykuły z kategori parti
    this.getArticles(ArticlesTypesEnum.PoliticalParties);
    // Pobiera 4 artykuły z kategori polityycy
    this.getArticles(ArticlesTypesEnum.Politicians);
  }

  getArticles(type: ArticlesTypesEnum, orderChange?: OrderEnum) {
    this.changeSection(type, true);
    let lastItem: Date | number | null = null;

    // przypisz snapshot
    if (this.data.value[type].articles.length && !orderChange)
      lastItem = this.data.value[type].lastArticlesnapshot;
    else
      lastItem = null;

    this.articlesService
      .getArticles(type, this.limit, orderChange || this.data.value[type].order, lastItem)
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
              articles: orderChange ? articles : [...this.data.value[type].articles, ...articles],
              lastArticlesnapshot: snap,
              order: orderChange || this.data.value[type].order,
              isLastPage: isLimit,
              isLoading: false
            }
          })
        },
        error: () => this.changeSection(type, false)
      });
  }

  getTopArticle() {
    this.articlesService.getFirstTOPArticle().subscribe(snap => {
      snap.forEach(doc => this.topArticle.next({ ...doc.data() as ArticleModel, id: doc.id }))
    })
  }

  private metaTags() {
    this.titleService.setTitle('Polityka i inne tematy - Afery');
    this.meta.updateTag({ name:'description', content:'Afery naszych polityków, partii i innych osobistości. Mamy miejsce, gdzie możesz pogadać o wszystkim bez żadnej cenzury oraz miejsce, gdzie zbieramy sondaże (nie tylko partii).' }, "name='description'");
  }

  private changeSection(type: ArticlesTypesEnum, isLoading: boolean) {
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
        order: OrderEnum.Latest,
        lastArticlesnapshot: null,
        isLastPage: false,
        isLoading: false,
      }
    })

    return object;
  }
}
