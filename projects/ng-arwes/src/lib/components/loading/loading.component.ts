import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChildren,
} from '@angular/core';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { Subject } from 'rxjs';
import { InputBoolean } from 'ng-arwes/tools';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { ThemeService } from 'ng-arwes/services/public-api';
import { takeUntil } from 'rxjs/operators';
import { loadingBodyMotion } from './loading.animation';

@Component({
  selector: 'arwes-loading',
  styleUrls: ['./loading.component.less'],
  animations: [loadingBodyMotion],
  template: `
    <div
      #root
      class="arwes-loading"
      [ngClass]="{ full: full, small: small }"
      *ngIf="show"
      [@.disabled]="!animate"
      [@appearMotion]="{
        value: null,
        params: {
          animTime: theme.animTime
        }
      }"
    >
      <div #circle #circle1 class="circle circle1"></div>
      <div #circle #circle2 class="circle circle2"></div>
    </div>
  `,
})
export class LoadingComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @Input()
  @InputBoolean()
  show = true;

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  @Input()
  @InputBoolean()
  animate = false;

  @Input()
  @InputBoolean()
  small = false;

  @Input()
  @InputBoolean()
  full = false;

  @ViewChildren('root')
  root: HTMLDivElement;

  @ViewChildren('circle')
  circles: Array<HTMLDivElement>;

  @ViewChildren('circle1')
  circle1: HTMLDivElement;

  @ViewChildren('circle2')
  circle2: HTMLDivElement;

  constructor(public themeSvc: ThemeService) { }

  ngOnInit() {
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.theme = theme;
      this.applyTheme(theme);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyTheme(theme = this.theme) {
    if (this.root) {
      this.root.style.transition = `all ${theme.animTime}ms ease-out`;
    }
    if (this.circles) {
      this.circles.forEach((circle) => {
        const border = `5px solid ${theme.color[this.layer].base}`;
        circle.style['border-top'] = border;
        circle.style['border-bottom'] = border;
        circle.style['box-shadow'] = `0 0 ${theme.shadowLength * 2}px ${
          theme.color[this.layer].base
          }`;
        circle.style.transition = `all ${theme.animTime}ms ease-out`;
      });
    }
    if (this.circle1) {
      this.circle1.style.animation = `arwes-loading-circle1 ${
        theme.animTime * 3
        }ms infinite linear`;
    }
    if (this.circle2) {
      this.circle2.style.animation = `arwes-loading-circle2 ${
        theme.animTime * 3
        }ms infinite linear`;
      if (this.small) {
        const border = `3px solid ${theme.color[this.layer].base}`;
        this.circle2.style['border-bottom'] = border;
        this.circle2.style['border-top'] = border;
      }
    }
  }
}
