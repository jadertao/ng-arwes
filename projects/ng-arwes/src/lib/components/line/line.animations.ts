import { trigger, state, style, transition, animate } from '@angular/animations';

export const lineBodyMotion = trigger('lineBodyMotion', [
  transition(':enter', [
    style({ width: '0%' }),
    animate('{{ animTime }}ms ease-out', style({ width: '100%' }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({ width: '0%' }))
  ])
]);

export const lineDotMotion = trigger('lineDotMotion', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(`{{ animTime }}ms {{ animDelay }}ms ease-out`, style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms {{ animDelay }}ms ease-out', style({ opacity: 0 }))
  ])
]);
