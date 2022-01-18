import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reading-progress-bar',
  templateUrl: './reading-progress-bar.component.html',
  styleUrls: ['./reading-progress-bar.component.scss']
})
export class ReadingProgressBarComponent implements AfterViewInit {
  @ViewChild('postContainer') postContainer: ElementRef;
  @ViewChild('progress') progressBarEl: ElementRef;

  ngAfterViewInit() {
    this.updateScrollProgressBar();
  }

  @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
      this.updateScrollProgressBar();
    }

  private updateScrollProgressBar() {
    const scrollHeight = this.postContainer.nativeElement.scrollHeight - this.heightInViewport(this.postContainer);
    console.log(scrollHeight);

    const scrollPosition = this.postContainer.nativeElement.scrollTop;

    const scrollPercentage = (scrollPosition / scrollHeight) * 100;
    this.progressBarEl.nativeElement.style.width = scrollPercentage + "%";
  }

  private heightInViewport(el: ElementRef) {
    var elH = el.nativeElement.offsetHeight,
        H   = document.body.offsetHeight,
        r   = el.nativeElement.getBoundingClientRect(), t = r.top, b = r.bottom;
    return Math.max(0, t>0 ? Math.min(elH, H-t) : Math.min(b, H));
  }
}
