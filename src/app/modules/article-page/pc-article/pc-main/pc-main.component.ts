import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {}

  checkHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
