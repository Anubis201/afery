import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ArticleModel } from 'src/app/models/articles/article.model';
import { OrderEnum } from 'src/app/models/articles/enums/order.enum';
import { showAnimation } from 'src/app/services/animations/others.animations';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['.././all-articles.component.scss'],
  animations: [showAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
  @Input() name: string
  @Input() articles: ArticleModel[]
  @Input() reachedMaxArticles: boolean
  @Input() isLoading: boolean
  @Input() orderSection: OrderEnum

  @Output() handlePage = new EventEmitter<void>()
  @Output() changeOrder = new EventEmitter<OrderEnum>()

  readonly OrderEnum = OrderEnum

  getFirstWord(str: string) {
    return str.split(' ')[0];
  }
}
