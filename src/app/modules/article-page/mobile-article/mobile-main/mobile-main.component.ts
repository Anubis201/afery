import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {}

  checkHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
