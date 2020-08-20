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
import { genCodeStyle } from './code.style';
import { codeMotion } from './code.animation';
import { DEFAULT_THEME } from './../../tools/theme';
import { StyleService } from 'ng-arwes/services/style/style.service';

const CodeSelector = 'code[na-code], pre[na-code]';

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
  private name = 'na-code';

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
    this.classes = `na-code language-${v}`;
  }

  @HostBinding('class') classes = `na-code`;
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
    private style: StyleService,
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
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.highlight();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  highlight() {
    if (this.el) {
      Prism.highlightElement(this.el, false, () => this.applyTheme()); // eslint-disable-line no-undef
    }
  }
  applyTheme(theme: NgArwesTheme = this.theme) {
    if (!theme || !this.style) {
      return;
    }
    this.style.updateContent(this.name, genCodeStyle(theme));
  }
}
