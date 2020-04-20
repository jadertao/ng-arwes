import { trigger, state, style, transition, animate } from '@angular/animations';

export const codeMotion = trigger('codeMotion', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('{{ animTime }}ms ease-out', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({ opacity: 0 }))
  ])
]);
