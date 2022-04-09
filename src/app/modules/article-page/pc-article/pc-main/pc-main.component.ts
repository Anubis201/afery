import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ArticleWriteEnum } from 'src/app/models/articles/enums/article-write.enum';
import { LiveItemModel } from 'src/app/models/articles/live-item.model';

@Component({
  selector: 'app-pc-main',
  templateUrl: './pc-main.component.html',
  styleUrls: ['./pc-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PcMainComponent {
  @Input() subtitle: string
  @Input() imageSrc: string
  @Input() title: string
  @Input() text: string
  @Input() imageDesc: string
  @Input() tags: string
  @Input() isShort = false
  @Input() liveItems: LiveItemModel[]
  @Input() articleWrite: ArticleWriteEnum

  constructor(private sanitizer: DomSanitizer) {}

  readonly ArticleWriteEnum = ArticleWriteEnum

  checkHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
