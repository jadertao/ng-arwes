import { NG_ARWES_SOUND_TOKEN, NgArwesSound } from '../../tools/sound';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(@Inject(NG_ARWES_SOUND_TOKEN) public sound: Partial<NgArwesSound>) { }

}
