import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.scss']
})
export class ReadingProgressBarComponent implements AfterViewInit {
  @ViewChild('progressBar') progressBar: ElementRef;

  ngAfterViewInit() {
    this.processScroll()
  }

  private processScroll() {
    let docElem = document.documentElement,
        docBody = document.body,
        scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
        scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
        scrollPercent = scrollTop / scrollBottom * 100 + '%';

    this.progressBar.nativeElement.style.width = scrollPercent;
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.processScroll();
    }
}
