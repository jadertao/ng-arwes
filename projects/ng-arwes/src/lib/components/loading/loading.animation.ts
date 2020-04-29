import { trigger, state, style, transition, animate } from '@angular/animations';

export const loadingBodyMotion = trigger('loadingBodyMotion', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('{{ animTime }}ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({ opacity: 0 }))
  ])
]);
