import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { showAnimation } from 'src/app/services/animations/others.animations';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations: [showAnimation]
})
export class TagViewComponent implements OnInit {
  articles = new BehaviorSubject<ArticleModel[]>([])
  isLoading = new BehaviorSubject<boolean>(true)
  tagName = new BehaviorSubject<string>(null)

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private titleService: Title,
    private meta: Meta,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ tagName }: { tagName: string }) => {
      this.metaTagsAndTitle(tagName);
      this.tagName.next(tagName);
      this.getArticles(tagName);
    })
  }

  getArticles(tag: string) {
    this.articlesService.getArticlesByTagName(tag).subscribe({
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
      },
      error: () => {
        this._snackBar.open('Nie udało się pobrać artykułu', 'zamknij');
        this.isLoading.next(false);
      }
    })
  }

  private metaTagsAndTitle(tagName: string) {
    this.titleService.setTitle(`Tag ${tagName} - Afery`);
    this.meta.updateTag({ name:'description', content:`Wszystkie artykuły, które zawierają tag ${tagName}.` }, "name='description'");
  }
}
