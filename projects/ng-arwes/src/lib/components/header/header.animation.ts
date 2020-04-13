import { trigger, state, style, transition, animate } from '@angular/animations';

export const headerSeparatorMotion = trigger('headerSeparatorMotion', [
  transition(':enter', [
    style({
      width: '0%',
    }),
    animate(`{{ animTime }}ms ease-in`, style({
      width: '100%',
    }))
  ]),
  transition(':leave', [
    animate(`{{ animTime }}ms ease-out`, style({
      width: '0%',
    }))
  ])
]);

