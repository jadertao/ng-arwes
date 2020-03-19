import {
  trigger,
  animate,
  transition,
  style,
  state
} from '@angular/animations';

export const slidingDoorAnimation = trigger('slidingDoorAnimation', [
  state('in',
    style({ width: '0px', overflow: 'hidden' }),
    {
      params: {
        inWidth: '250px',
      }
    }
  ),
  state('out', style({ width: '{{ outWidth }}' }), {
    params: { outWidth: '*' }
  }),
  transition('* <=> *', animate('{{ time }}'))
]);

export const moveAnimation = trigger('moveAnimation', [
  state('in', style({ transform: 'translateX(-400px)', display: 'none' })),
  state('out', style({ transform: 'translateX(0px)' })),
  transition('* => *', animate('500ms ease'))
]);
