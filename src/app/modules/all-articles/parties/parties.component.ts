import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['.././all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartiesComponent {
  @Input() name: string
  @Input() articles: ArticleModel[] | null
}
