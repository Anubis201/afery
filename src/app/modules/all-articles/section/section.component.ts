import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['.././all-articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  @Input() name: string
  @Input() articles: ArticleModel[] | null
  @Input() reachedMaxArticles: boolean | null

  @Output() handlePage = new EventEmitter<void>()
}
