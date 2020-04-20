import { Component, OnInit, Input, Inject, ElementRef, OnDestroy, AfterViewInit, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { InputBoolean } from './../../tools';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from './../../services/public-api';
import { NG_ARWES_SOUND_TOKEN } from './../../tools/sound';
import type { NgArwesSound } from './../../tools/sound';
import { takeUntil } from 'rxjs/operators';
import * as Prism from 'prismjs';
import { DOCUMENT } from '@angular/common';
import { genStyle } from './code.style';
import { codeMotion } from './code.animation';
import { DEFAULT_THEME } from './../../tools/theme';

const CodeSelector = 'code[arwes-code], pre[arwes-code]';

@Component({
  selector: CodeSelector,
  animations: [codeMotion],
  template: `
<ng-content></ng-content>
`,
})
export class CodeComponent implements OnInit, OnDestroy, AfterViewInit {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();
  private el: HTMLElement = this.elementRef.nativeElement;
  private _lang = 'javascript';
  private _animate = false;
  private style: HTMLStyleElement | null = null;

  @Input() @InputBoolean()
  set animate(v: boolean) {
    this._animate = v;
    this.disabled = !v;
  }
  get animate() {
    return this._animate;
  }

  /**
   * The programming language. Supported by [Prism](http://prismjs.com/).
   */
  @Input()
  set language(v: string) {
    this._lang = v;
    this.classes = `arwes-code language-${v}`;
  }

  @HostBinding('class') classes = `arwes-code`;
  @HostBinding('@.disabled') disabled = !this.animate;
  @HostBinding('@codeMotion') motion = {
    value: null,
    params: {
      animTime: DEFAULT_THEME.animTime,
    }
  };

  constructor(
    public themeSvc: ThemeService,
    private elementRef: ElementRef,
    @Inject(DOCUMENT) private doc: Document,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
        this.applyTheme(theme);
        this.motion = {
          value: null,
          params: {
            animTime: theme?.animTime
          }
        };
      });
    this.initTag();
  }

  ngOnInit() {
    console.log(this);
  }
  ngAfterViewInit() {
    this.highlight();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.style = null;
  }
  highlight() {
    if (this.el) {
      Prism.highlightElement(this.el, false, () => this.applyTheme()); // eslint-disable-line no-undef
    }
  }
  initTag() {
    const el = this.doc.querySelector<HTMLStyleElement>('head .arwes-code-theme');
    if (el) {
      this.style = el;
    } else {
      const style: HTMLStyleElement = this.doc.createElement('style');
      style.type = 'text/css';
      style.className = 'arwes-code-theme';
      style.appendChild(this.doc.createTextNode(''));
      this.doc.head.appendChild(style);
      this.style = style;
    }
  }
  applyTheme(theme: NgArwesTheme = this.theme) {
    let str = '';
    if (!theme || !this.style) {
      return;
    }
    str = genStyle(theme);
    this.style.innerHTML = str;
  }
}
