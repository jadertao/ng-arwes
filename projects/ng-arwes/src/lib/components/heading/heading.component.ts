import { Component, ElementRef, OnDestroy, Renderer2, ViewEncapsulation, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { rgba } from 'polished';
import { takeUntil } from 'rxjs/operators';
import { Subject, } from 'rxjs';
import { NgArwesThemeTypographyHeaderEnum } from '../../types/theme.enums';
import { ThemeService } from '../../services/theme.service';
import { NgArwesTheme } from '../../types/theme.interfaces';

const HeadingSelector = 'h1[arwes-heading], h2[arwes-heading], h3[arwes-heading], h4[arwes-heading], h5[arwes-heading], h6[arwes-heading]';

@Component({
  selector: HeadingSelector,
  styleUrls: ['./heading.component.less'],
  template: `<ng-content *ngIf="type"></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingComponent implements OnDestroy {
  private el: HTMLElement = this.elementRef.nativeElement;
  public type: NgArwesThemeTypographyHeaderEnum | null = ({
    H1: NgArwesThemeTypographyHeaderEnum.H1,
    H2: NgArwesThemeTypographyHeaderEnum.H2,
    H3: NgArwesThemeTypographyHeaderEnum.H3,
    H4: NgArwesThemeTypographyHeaderEnum.H4,
    H5: NgArwesThemeTypographyHeaderEnum.H5,
    H6: NgArwesThemeTypographyHeaderEnum.H6,
  })[this.el.tagName] || null;
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @HostBinding('class.arwes-heading') className = true;

  constructor(
    private elementRef: ElementRef,
    private themeSvc: ThemeService,
    private renderer: Renderer2,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.deriveStyleFromTheme(theme);
        this.theme = theme;
      });
  }

  deriveStyleFromTheme(theme: NgArwesTheme = this.theme) {
    if (this.type) {
      this.renderer.setStyle(this.el, 'margin', `0 0 ${theme.margin}`);
      this.renderer.setStyle(this.el, 'font-family', `0 0 ${theme.typography.fontFamily}`);
      this.renderer.setStyle(this.el, 'text-shadow', `0 0 ${theme.shadowLength}px ${rgba(theme.color.header.base, theme.alpha)}`);
      this.renderer.setStyle(this.el, 'color', theme.color.header.base);
      this.renderer.setStyle(this.el, 'transition', `color, ${theme.animTime}ms ease-out`);
      this.renderer.setStyle(this.el, 'font-family', `${theme.typography.headerSizes[this.type]}px`);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
