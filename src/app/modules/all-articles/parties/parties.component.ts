import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArticlesTypesEnum } from 'src/app/models/articles/enums/articles-types.enum';
import { ArticlesService } from 'src/app/services/collections/articles/articles.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['.././all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartiesComponent implements OnInit {
  constructor(private articlesService: ArticlesService) {}

  ngOnInit() {
    this.getArticles()
  }

  getArticles() {
    this.articlesService
      .getArticles(ArticlesTypesEnum.PoliticalParties, 4)
      .subscribe({
        next: articles => {
          articles.forEach(value => { console.log(value.data()) })
        },
        error: () => {},
      });
  }
}
