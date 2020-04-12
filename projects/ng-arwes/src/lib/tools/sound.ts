import { InjectionToken } from '@angular/core';

export interface NgArwesSoundOptions {
  information: string;
  ask: string;
  warning: string;
  error: string;
  click: string;
  typing: string;
  deploy: string;
}

export type NgArwesSound = {
  [key in keyof NgArwesSoundOptions]?: Howl
};

export const NG_ARWES_SOUND_TOKEN = new InjectionToken<NgArwesSound>('NG_ARWES_SOUND_TOKEN');
