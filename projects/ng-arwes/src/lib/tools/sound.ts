import { InjectionToken } from '@angular/core';

export interface NgArwesSound {
  information: string;
  ask: string;
  warning: string;
  error: string;
}

export const NG_ARWES_SOUND_TOKEN = new InjectionToken<NgArwesSound>('NG_ARWES_SOUND_TOKEN');
