import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor() { }

  image(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = img.onabort = () => reject();
      img.src = url;
    });
  }

  sound(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const sound = new Audio();
      sound.addEventListener('canplaythrough', () => resolve());
      sound.onerror = sound.onabort = () => reject();
      sound.src = url;
    });
  }

  all(resources: { images: string[], sounds: string[] }, opts?: { timeout: string }): Promise<void> {
    const { images = [], sounds = [] } = resources || {};
    const options = Object.assign({ timeout: 30000 }, opts);

    return new Promise((resolve, reject) => {
      setTimeout(reject, options.timeout);
      Promise.all([
        ...images.map(image => this.image(image)),
        ...sounds.map(sound => this.sound(sound))
      ]).then(() => resolve(), reject);
    });
  }
}
