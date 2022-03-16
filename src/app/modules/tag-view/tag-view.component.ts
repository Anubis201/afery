import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TagViewComponent implements OnInit {
  articles = new BehaviorSubject<ArticleModel[]>([])

  constructor(
    private activatedRoute: ActivatedRoute,
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ tagName }: { tagName: string }) => {
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
      },
      error: () => {
        this._snackBar.open('Nie udało się pobrać artykułu', 'zamknij');
      }
    })
  }
}
