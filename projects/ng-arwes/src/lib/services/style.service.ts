import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  cache: Record<string, HTMLStyleElement> = {};

  constructor() { }

  getTag(name: string) {
    let tag = this.cache[name];
    if (tag) {
      return tag;
    }
  }
}
