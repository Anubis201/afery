import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  searchValue = new FormControl('')
  articles = new BehaviorSubject<ArticleModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private articlesService: ArticlesService,
    private meta: Meta,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.metaTagsAndTitle();

    this.searchValue.valueChanges
      .pipe(
        filter(value => value.length >= 2),
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.isLoading.next(true)),
        switchMap(value =>
          this.articlesService.likeQuery(value).pipe(
            map(docs => {
              let articles: ArticleModel[] = [];

              docs.forEach(d =>{
                articles.push({
                  ...d.data() as ArticleModel,
                  id: d.id,
                  createDate: (d.data() as any).createDate.toDate()
                });
              })

              return articles;
            })
          )
        )
      )
      .subscribe(articles => {
        this.articles.next(articles);
        this.isLoading.next(false);
      })
  }

  private metaTagsAndTitle() {
    this.titleService.setTitle('Afery - Szukaj afer');
    this.meta.updateTag({ name:'description', content:'Chcesz znaleźć jakąś afere? Zapraszamy do wyszukiwarki.' }, "name='description'");
  }
}
