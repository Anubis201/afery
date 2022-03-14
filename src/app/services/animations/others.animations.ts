import { animate, style, transition, trigger } from "@angular/animations";


export const showAnimation =
  trigger('showAnimation', [
    transition('void => *', [
      style({ height: '*', opacity: '0'}),
      animate("1s ease", style({ height: '*', opacity: 1 })),
    ])
  ]);
