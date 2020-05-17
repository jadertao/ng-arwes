import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { Subject } from 'rxjs';
import { arc } from 'd3-shape';
import { rgba } from 'polished';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { InputBoolean } from 'ng-arwes/tools';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { styleObject2String } from 'ng-arwes/tools/style';

const createArc = arc();
const radians = (degress: number): number => (degress * Math.PI) / 180;

@Component({
  selector: 'arwes-logo',
  styleUrls: ['./logo.component.less'],
  template: `
    <svg
      class="arwes-logo"
      attr.width="{{ width }}"
      attr.height="{{ height }}"
      viewBox="0 0 1000 1000"
      version="1.1"
      [style]="root"
    >
      <filter id="arwes-logo-filter-blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
      </filter>
      <g style="transform: translate(500px,500px)">
        <circle class="arwes-logo-light arwes-logo-element-filter"
          cx="0"
          cy="0"
          r="85"
        />
        <circle
          class="arwes-logo-light"
          cx="0"
          cy="0"
          r="85"
          [style.fill]="light"
        />
        <path
          class="arwes-logo-center"
          attr.d="{{arcs[0]}}"
          [style.fill]="center"
        />
        <path
          class="arwes-logo-outer"
          attr.d="{{arcs[1]}}"
          [style.fill]="outer"
        />
        <path
          class="arwes-logo-light arwes-logo-element-filter"
          attr.d="{{arcs[2]}}"
          [style.fill]="light"
        />
        <path
          class="arwes-logo-light"
          attr.d="{{arcs[2]}}"
          [style.fill]="light"
        />
        <path
          class="arwes-logo-light arwes-logo-element-filter"
          attr.d="{{arcs[3]}}"
          [style.fill]="light"
        />
        <path
          class="arwes-logo-light"
          attr.d="{{arcs[3]}}"
          [style.fill]="light"
        />
        <path
          class="arwes-logo-light arwes-logo-element-filter"
          attr.d="{{arcs[4]}}"
          [style.fill]="light"
        />
        <path
          class="arwes-logo-light"
          attr.d="{{arcs[4]}}"
          [style.fill]="light"
        />
      </g>
    </svg>
  `,
})
export class LogoComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @Input()
  width = 100;
  @Input()
  height = 100;
  @Input()
  layer = NgArwesLayerStatusEnum.Primary;
  @Input()
  @InputBoolean()
  animate = false;

  light = '';
  center = '';
  outer = '';
  root: SafeStyle;

  arcs = [
    createArc({
      innerRadius: 200,
      outerRadius: 275,
      startAngle: 0,
      endAngle: radians(360)
    }),
    createArc({
      innerRadius: 375,
      outerRadius: 475,
      startAngle: 0,
      endAngle: radians(360)
    }),
    createArc({
      innerRadius: 375,
      outerRadius: 475,
      startAngle: radians(0 + 15),
      endAngle: radians(90 + 15)
    }),
    createArc({
      innerRadius: 375,
      outerRadius: 475,
      startAngle: radians(90 + 30 + 15),
      endAngle: radians(90 * 2 + 30 + 15)
    }),
    createArc({
      innerRadius: 375,
      outerRadius: 475,
      startAngle: radians(90 * 2 + 30 * 2 + 15),
      endAngle: radians(90 * 3 + 30 * 2 + 15)
    }),
  ];
  constructor(
    public themeSvc: ThemeService,
    public sanitizer: DomSanitizer,
  ) {
    console.log(this.animate);
  }

  ngOnInit() {
    console.log(this.animate);
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
        this.applyTheme(theme);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyTheme(theme = this.theme) {
    this.light = theme.color[this.layer].base;
    this.center = rgba(theme.color[this.layer].base, 0.5);
    this.outer = rgba(theme.color[this.layer].base, 0.2);
    this.root = this.sanitizer.bypassSecurityTrustStyle(styleObject2String({
      transition: `opacity ${theme.animTime}ms ease-out`,
      animation: this.animate
        ? `arwes-logo-rotate ${theme.animTime * 200}ms infinite linear`
        : '',
    }));
  }
}
