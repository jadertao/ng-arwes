import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService } from 'ng-arwes/services/theme.service';
import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';
import { NgArwesLayerStatusEnum } from 'ng-arwes/types/theme.enums';
import { lineDotMotion, lineBodyMotion } from './line.animations';

@Component({
  selector: 'arwes-line',
  animations: [lineDotMotion, lineBodyMotion],
  styleUrls: ['./line.component.less'],
  template: `
    <div *ngIf="show" class="arwes-line" [style.margin-bottom.px]="theme.margin">
      <div
      *ngIf="show"
      class="arwes-line-body"
      [style.border-color]="theme.color[layer].dark"
      [@lineBodyMotion]="{
        value: null,
        params: { animTime: theme.animTime }
      }"
      ></div>
      <div
      *ngIf="show"
      class="arwes-line-left"
      [style.background-color]="theme.color[layer].dark"
      [@lineDotMotion]="{
        value: null,
        params: {
          animTime: (theme.animTime / 4) * 3,
          animDelay: theme.animTime / 4
        }
      }"
      ></div>
      <div
      *ngIf="show"
      class="arwes-line-right"
      [style.background-color]="theme.color[layer].dark"
      [@lineDotMotion]="{
        value: null,
        params: {
          animTime: (theme.animTime / 4) * 3,
          animDelay: theme.animTime / 4
        }
      }"
      ></div>
    </div>
    `,
})
export class LineComponent implements OnDestroy {
  public theme: NgArwesTheme | null = null;
  private destroy$ = new Subject<void>();

  @Input()
  show = true;

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  constructor(public themeSvc: ThemeService) {
    this.themeSvc.theme$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(theme => {
        this.theme = theme;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
