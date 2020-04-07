import { Component, OnInit, Input, OnDestroy, Renderer2, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from '../../services/theme.service';
import { NgArwesTheme } from '../../types/theme.interfaces';
import { NgArwesLayerStatusEnum } from '../../types/theme.enums';

const BlockquoteSelector = 'blockquote[arwes-blockquote]';

@Component({
  selector: BlockquoteSelector,
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockquoteComponent implements OnInit, OnDestroy {

  private _layer = NgArwesLayerStatusEnum.Primary;
  private theme: NgArwesTheme | null = null;
  private el: HTMLElement = this.elementRef.nativeElement;
  private destroy$ = new Subject<void>();

  @HostBinding('style.display') diplay = 'block';

  @Input() set layer(value: NgArwesLayerStatusEnum) {
    this._layer = value;
    console.log('set here', this.layer, value, this.theme);
    this.deriveLayerStyleFromTheme();
  }
  get layer() {
    return this._layer;
  }

  constructor(
    public themeSvc: ThemeService,
    private renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        const withColor = !!this.theme;
        this.theme = theme;
        this.deriveStyleFromTheme(theme, withColor);
      });
  }



  deriveStyleFromTheme(theme: NgArwesTheme = this.theme, withLayer = true) {
    this.renderer.setStyle(this.el, 'border-left', `4px solid ${theme.color.primary.light}`);
    this.renderer.setStyle(this.el, 'margin', `0 0 ${theme.margin}px ${theme.margin}px`);
    this.renderer.setStyle(this.el, 'padding', `0 0 0 ${theme.padding / 2}px`);
    if (withLayer) {
      console.log('set there');
      this.deriveLayerStyleFromTheme(theme);
    }
  }

  deriveLayerStyleFromTheme(theme: NgArwesTheme = this.theme) {
    if (theme.color[this.layer]) {
      const color = theme.color[this.layer].light;
      console.log(this.layer, theme.color[this.layer], color);
      this.renderer.setStyle(this.el, 'color', color);
      this.renderer.setStyle(this.el, 'border-color', color);
    } else {
      this.renderer.setStyle(this.el, 'color', theme.color.primary.light);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
