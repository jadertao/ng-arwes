import { DEFAULT_THEME } from './../../tools/theme';
import type { SafeStyle } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { rgba } from 'polished';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { styleObject2String } from './../../tools/style';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from './../../services/theme.service';
import { Component, OnDestroy, HostBinding, ViewEncapsulation, HostListener } from '@angular/core';

const LinkSelector = 'a[arwes-link]';

@Component({
  selector: LinkSelector,
  styleUrls: ['./link.component.less'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
})
export class LinkComponent implements OnDestroy {
  public hover = false;
  private destroy$ = new Subject<void>();
  private theme: NgArwesTheme = DEFAULT_THEME;
  private _color: SafeStyle;

  @HostBinding('class.arwes-link') className = true;
  @HostBinding('style') staticStyle: SafeStyle = '';
  @HostBinding('style.color') get color() {
    return this._color;
  }

  constructor(
    public themeSvc: ThemeService,
    private sanitizer: DomSanitizer,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.deriveStyleFromTheme(theme);
      });
  }

  @HostListener('mouseover') over() {
    this.hover = true;
    this.deriveColorFromTheme();
  }
  @HostListener('mouseleave') leave() {
    this.hover = false;
    this.deriveColorFromTheme();
  }

  deriveStyleFromTheme(theme: NgArwesTheme = this.theme) {
    this.deriveColorFromTheme(theme);
    this.staticStyle = this.sanitizer.bypassSecurityTrustStyle(styleObject2String({
      'text-shadow': `0px 0px ${theme.shadowLength}px ${rgba(theme.color.control.base, theme.alpha)}`,
      transition: `color ${theme.animTime}ms ease-out`,
    }));
    this.theme = theme;
  }

  deriveColorFromTheme(theme: NgArwesTheme = this.theme) {
    this._color = this.sanitizer.bypassSecurityTrustStyle(this.hover ? theme.color.control.light : theme.color.control.base);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
