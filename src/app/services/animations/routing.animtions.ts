import { animate, style, transition, trigger } from "@angular/animations";

export const routeAnimations =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0,
        top: 0,
        transform: 'scale(0) translateY(100%)'
      }),
      animate("500ms ease", style({ opacity: 1, transform: 'scale(1), translateY(0)' })),
    ])
  ]);
