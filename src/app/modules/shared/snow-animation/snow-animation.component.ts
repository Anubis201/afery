import { Component } from '@angular/core';

@Component({
  selector: 'app-snow-animation',
  templateUrl: './snow-animation.component.html',
  styleUrls: ['./snow-animation.component.scss']
})
export class SnowAnimationComponent {

  snowflakes = new Array(120).fill(null)
}
