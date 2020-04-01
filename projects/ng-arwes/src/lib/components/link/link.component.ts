import { DEFAULT_THEME } from './../../tools/theme';
import type { SafeStyle } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { rgba } from 'polished';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgArwesTheme } from './../../types/theme.interfaces';
import { ThemeService } from './../../services/theme.service';
import {
  Component, OnDestroy, HostBinding, ViewEncapsulation, HostListener,
  Renderer2, ElementRef, ChangeDetectionStrategy
} from '@angular/core';

const LinkSelector = 'a[arwes-link]';

@Component({
  selector: LinkSelector,
  styleUrls: ['./link.component.less'],
  template: '<ng-content></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkComponent implements OnDestroy {
  public hover = false;

  private destroy$ = new Subject<void>();
  private theme: NgArwesTheme = DEFAULT_THEME;
  private el: HTMLElement = this.elementRef.nativeElement;

  @HostBinding('class.arwes-link') className = true;

  constructor(
    public themeSvc: ThemeService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
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

  deriveStyleFromTheme(theme: NgArwesTheme = this.theme, withColor: boolean = true) {
    this.theme = theme;
    this.renderer.setStyle(this.el, 'text-shadow', `0px 0px ${theme.shadowLength}px ${rgba(theme.color.control.base, theme.alpha)}`);
    this.renderer.setStyle(this.el, 'transition', `color ${theme.animTime}ms ease-out`);
    if (withColor) {
      this.renderer.setStyle(this.el, 'color', this.hover ? theme.color.control.light : theme.color.control.base);
    }
  }

  deriveColorFromTheme(theme: NgArwesTheme = this.theme) {
    this.renderer.setStyle(this.el, 'color', this.hover ? theme.color.control.light : theme.color.control.base);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
