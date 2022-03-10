import { animate, sequence, style, transition, trigger } from "@angular/animations";

export const showTable =
  trigger('addItem', [
    transition('void => *', [
      style({ height: '*', opacity: '0', transform: 'translateX(-100vw)', 'box-shadow': 'none' }),
      sequence([
        animate("1s ease", style({ height: '*', opacity: '.4', transform: 'translateX(0)', 'box-shadow': 'none' })),
        animate(".5s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]);
