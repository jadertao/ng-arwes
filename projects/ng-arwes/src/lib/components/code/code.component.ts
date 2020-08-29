import { Component, OnInit, Input, Inject, ElementRef, OnDestroy, AfterViewInit, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { InputBoolean } from './../../tools';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from './../../services/public-api';
import { takeUntil } from 'rxjs/operators';
import * as Prism from 'prismjs';
import { DOCUMENT } from '@angular/common';
import { NgArwesCodeStyle } from './code.style';
import { codeMotion } from './code.animation';
import { DEFAULT_THEME } from './../../tools/theme';
import { StyleService } from 'ng-arwes/services/style/style.service';
import jss, { StyleSheet } from 'jss';

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
  private sheet: StyleSheet<string>;
  public classes: Record<string, string>;

  private destroy$ = new Subject<void>();
  private el: HTMLElement = this.elementRef.nativeElement;
  private _animate = false;
  private _language = 'javascript';

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
    this._language = v;
    this.updateHostClasses();
  }
  get language() {
    return this._language;
  }

  @HostBinding('class') class = 'na-code';

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
        this.motion = {
          value: null,
          params: {
            animTime: theme?.animTime
          }
        };
        this.update();
      });
  }

  ngOnInit() {
    this.sheet = jss.createStyleSheet<string>(NgArwesCodeStyle, { link: true }).attach();
    this.classes = this.sheet.classes;
    this.updateHostClasses();
    console.log(this);
  }
  ngAfterViewInit() {
    this.highlight();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  update() {
    if (this.sheet) {
      this.sheet.update({
        theme: this.theme
      });
    }
  }
  updateHostClasses() {
    const classes = [];
    if (this.language) {
      classes.push(`language-${this.language}`);
    }
    if (this.classes) {
      classes.push(this.classes.root);
    }
    this.class = classes.join(' ');
  }
  highlight() {
    if (this.el) {
      Prism.highlightElement(this.el, false, () => this.update()); // eslint-disable-line no-undef
    }
  }
}
