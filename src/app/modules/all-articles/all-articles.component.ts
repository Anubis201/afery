import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
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

  constructor(
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    // Pobiera 4 artykuły z kategori parti
    this.getArticles(ArticlesTypesEnum.PoliticalParties);
    this.getArticles(ArticlesTypesEnum.Politicians);
  }

  private getArticles(type: ArticlesTypesEnum) {
    this.articlesService
      .getArticles(type, 4)
      .subscribe({
        next: doc => {
          doc.forEach(value => {
            const article: ArticleModel = { ...value.data() as ArticleModel, id: value.id, createDate: (value.data() as any).createDate.toDate() };

            switch(type) {
              case ArticlesTypesEnum.PoliticalParties:
                this.parties.next([...this.parties.value, article])
                break;
              case ArticlesTypesEnum.Politicians:
                this.politicians.next([...this.politicians.value, article])
                break;
            }
          })
        },
        error: () => {
          this._snackBar.open('Błąd! Skontaktuj się z pomocą techniczną', 'close');
        },
      });
  }
}
