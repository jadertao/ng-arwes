import { trigger, state, style, transition, animate } from '@angular/animations';

export const borderWidthMotion = trigger('borderWidthMotion', [
  transition(':enter', [
    style({ width: 0 }),
    animate('{{ animTime }}ms ease-out', style({ width: '100%' }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({ width: 0 }))
  ])
]);

export const borderHeightMotion = trigger('borderHeightMotion', [
  transition(':enter', [
    style({ height: 0 }),
    animate('{{ animTime }}ms ease-out', style({ height: '100%' }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({ height: 0 }))
  ])
]);

export const cornerMotion = trigger('cornerMotion', [
  transition(':enter', [
    style({
      width: 0,
      height: 0,
      opacity: 0,
    }),
    animate('{{ animTime }}ms ease-out', style({
      width: '*',
      height: '*',
      opacity: 1,
    }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({
      width: 0,
      height: 0,
      opacity: 0,
    }))
  ])
]);

export const boxMotion = trigger('boxMotion', [
  transition(':enter', [
    style({ backgroundColor: 'transparent' }),
    animate('{{ animTime }}ms ease-out', style({ backgroundColor: '*' }))
  ]),
  transition(':leave', [
    animate('{{ animTime }}ms ease-out', style({ backgroundColor: 'transparent' }))
  ])
]);
