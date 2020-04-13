import { trigger, state, style, transition, animate } from '@angular/animations';

export const footerSeparatorMotion = trigger('footerSeparatorMotion', [
  transition(':enter', [
    style({
      width: '0%',
    }),
    animate(`{{ animTime }}ms ease-in`, style({
      width: '100%',
      // backgroundColor: 'rgba({{ backgroundColor }}, {{ alpha }})'
    }))
  ]),
  transition(':leave', [
    animate(`{{ animTime }}ms ease-out`, style({
      width: '0%',
    }))
  ])
]);

