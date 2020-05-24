import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  cache: Record<string, HTMLStyleElement> = {};

  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) { }

  getSelector(name: string): string {
    return `head .${name}`;
  }

  getTag(name: string): HTMLStyleElement {
    let tag = this.cache[name];
    if (tag) {
      return tag;
    }
    tag = this.doc.querySelector<HTMLStyleElement>(this.getSelector(name));
    if (tag) {
      return tag;
    }
    tag = this.doc.createElement('style');
    tag.type = 'text/css';
    tag.className = name;
    tag.appendChild(this.doc.createTextNode(''));
    this.doc.head.appendChild(tag);
    this.cache.name = tag;
    return tag;
  }
}
