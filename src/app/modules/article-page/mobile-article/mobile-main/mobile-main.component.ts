import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';
import { LiveItemModel } from 'src/app/models/articles/live-item.model';

@Component({
  selector: 'app-mobile-main',
  templateUrl: './mobile-main.component.html',
  styleUrls: ['./mobile-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MobileMainComponent {
  @Input() text: string
  @Input() tags: string
  @Input() subtitle: string
  @Input() liveItems: LiveItemModel[]
  @Input() articleWrite: ArticleWriteEnum

  constructor(private sanitizer: DomSanitizer) {}

  readonly ArticleWriteEnum = ArticleWriteEnum

  checkHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
