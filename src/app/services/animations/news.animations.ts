import { trigger, state, animate, style, transition } from "@angular/animations";

export const newsAnimation =
  trigger('news', [
    state('in', style({transform: 'translateX(-500px)'})),
    state('out', style({transform: 'translateX(100%)'})),
    transition('in => out', animate('5s linear')),
    transition('out => in', animate('5s linear'))
  ])
