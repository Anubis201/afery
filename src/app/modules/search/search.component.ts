import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  form = new FormGroup({
    searched: new FormControl('')
  })

  articles = new BehaviorSubject<ArticleModel[]>([])
  isLoading = new BehaviorSubject<boolean>(false)

  constructor(
    private articlesService: ArticlesService,
    private meta: Meta,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.metaTagsAndTitle();
  }

  search() {
    this.isLoading.next(true);
    this.articlesService.likeQuery(this.form.get('searched').value).subscribe({
      next: docs => {
        let articles: ArticleModel[] = [];

        docs.forEach(d =>{
          articles.push({
            ...d.data() as ArticleModel,
            id: d.id,
            createDate: (d.data() as any).createDate.toDate()
          });
        })

        this.articles.next(articles);
        this.isLoading.next(false);
      }
    })
  }

  private metaTagsAndTitle() {
    this.titleService.setTitle('Szukaj');

    this.meta.updateTag({ name:'description', content:'Chcesz znaleźć jakąś afere? Zapraszamy do wyszukiwarki.' }, "name='description'");
  }
}
