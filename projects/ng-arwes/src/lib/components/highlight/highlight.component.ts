import { darken } from 'polished';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from './../../services/theme.service';
import { NgArwesLayerStatusEnum } from './../../types/theme.enums';
import { InputBoolean } from './../../tools';
import { Subject } from 'rxjs';
import { NgArwesTheme } from './../../types/theme.interfaces';
import {
  Component, OnInit,
  Input, OnDestroy, HostBinding, ViewEncapsulation,
  ChangeDetectionStrategy, ViewChild, ElementRef, Renderer2, HostListener
} from '@angular/core';


// HTMLElement animation end event names.
const ON_ANIMATION_END = [
  'webkitAnimationEnd',
  'mozAnimationEnd',
  'MSAnimationEnd',
  'oanimationend',
  'animationend'
];

const HightlightSelector = '[arwes-highlight]';

@Component({
  selector: HightlightSelector,
  styleUrls: ['./highlight.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
<ng-content></ng-content>
`,
})
export class HighlightComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  private cover: HTMLDivElement | null;

  @Input()
  @InputBoolean()
  animate = false;

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  @HostBinding('class.arwes-highlight') classes = true;

  constructor(
    public themeSvc: ThemeService,
    public renderer: Renderer2,
    private elementRef: ElementRef,
  ) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
      });
  }

  @HostListener('click')
  onClick() {
    if (this.animate) {
      let cover = this.cover;
      if (!cover) {
        this.cover = this.renderer.createElement('div');
        this.cover.setAttribute('class', 'arwes-highlight-clicking');
        this.cover.style.backgroundColor = darken(0.3, this.theme.color[this.layer].base);
        this.cover.style.animation = `arwes-highlight-click ${this.theme.animTime}ms ease-out 0ms 1`;
        cover = this.cover;
      }
      ON_ANIMATION_END.forEach(event => {
        this.cover.addEventListener(event, () =>
          this.cover.remove()
        );
      });
      this.elementRef.nativeElement.appendChild(this.cover);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
