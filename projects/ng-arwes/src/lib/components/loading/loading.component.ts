import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChildren,
  ViewChild,
  ElementRef,
  AfterViewInit,
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
      [@loadingBodyMotion]="{
        value: null,
        params: {
          animTime: theme.animTime
        }
      }"
    >
      <div *ngIf="!small" #circle #circle1 class="circle circle1"></div>
      <div #circle #circle2 class="circle circle2"></div>
    </div>
  `,
})
export class LoadingComponent implements OnInit, OnDestroy, AfterViewInit {
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

  @ViewChild('root')
  root: ElementRef<HTMLDivElement>;

  @ViewChildren('circle')
  circles: Array<ElementRef<HTMLDivElement>>;

  @ViewChild('circle1')
  circle1: ElementRef<HTMLDivElement>;

  @ViewChild('circle2')
  circle2: ElementRef<HTMLDivElement>;

  constructor(public themeSvc: ThemeService) {
    this.themeSvc.theme$.pipe(takeUntil(this.destroy$)).subscribe((theme) => {
      this.theme = theme;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.applyTheme();
  }

  applyTheme(theme = this.theme) {
    if (!this.theme) {
      return;
    }
    if (this.root) {
      this.root.nativeElement.style.transition = `all ${theme.animTime}ms ease-out`;
      this.root.nativeElement.style.minHeight = `${50 + theme.padding * 2}px`;
    }
    if (this.circles) {
      this.circles.forEach((circle) => {
        const border = `5px solid ${theme.color[this.layer].base}`;
        circle.nativeElement.style.borderTop = border;
        circle.nativeElement.style.borderBottom = border;
        circle.nativeElement.style.boxShadow = `0 0 ${theme.shadowLength * 2}px ${
          theme.color[this.layer].base
          }`;
        circle.nativeElement.style.transition = `all ${theme.animTime}ms ease-out`;
      });
    }
    if (this.circle1) {
      this.circle1.nativeElement.style.animation = `arwes-loading-circle1 ${
        theme.animTime * 3
        }ms infinite linear`;
    }
    if (this.circle2) {
      this.circle2.nativeElement.style.animation = `arwes-loading-circle2 ${
        theme.animTime * 3
        }ms infinite linear`;
      if (this.small) {
        const border = `3px solid ${theme.color[this.layer].base}`;
        this.circle2.nativeElement.style.borderBottom = border;
        this.circle2.nativeElement.style.borderTop = border;
      }
    }
  }
}
