import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';
import { ImagesService } from 'src/app/services/collections/images/images.service';

@Component({
  selector: 'app-all-articles',
  templateUrl: './all-articles.component.html',
  styleUrls: ['./all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllArticlesComponent implements OnInit {
  parties = new BehaviorSubject<ArticleModel[]>([])

  constructor(
    private articlesService: ArticlesService,
    private _snackBar: MatSnackBar,
    private imagesService: ImagesService,
  ) { }

  ngOnInit() {
    // Pobiera 4 artykuły z kategori parti
    this.getArticles(ArticlesTypesEnum.PoliticalParties)
  }

  private getArticles(type: ArticlesTypesEnum) {
    this.articlesService
      .getArticles(type, 4)
      .subscribe({
        next: doc => {
          doc.forEach(value => {
            let article: ArticleModel = { ...value.data() as ArticleModel, id: value.id };
            this.getImage(article);
          })
        },
        error: () => {
          this._snackBar.open('Błąd! Skontaktuj się z pomocą techniczną', 'close');
        },
      });
  }

  private getImage(article: ArticleModel) {
    this.imagesService.getImage(article?.id).subscribe({
      next: imageSrc => {
        const articleWithImage: ArticleModel = { ...article, imageSrc };

        switch(article.type) {
          case ArticlesTypesEnum.PoliticalParties:
            this.parties.next([ ...this.parties.value, articleWithImage ]);
            break;
        }
      },
      error: () => {
        this._snackBar.open('Błąd nie udało się pobrać zdjęcia! Skontaktuj się z pomocą techniczną', 'close');
      }
    })
  }
}
