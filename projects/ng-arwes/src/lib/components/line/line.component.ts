import { lineDotMotion, lineBodyMotion } from './line.animations';
import { ThemeService } from '../../services/theme.service';
import { DEFAULT_THEME } from './../../tools/theme';
import { NgArwesTheme } from '../../types/theme.interfaces';
import { NgArwesLayerStatusEnum } from '../../types/theme.enums';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arwes-line',
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
  styleUrls: ['./line.component.less'],
  animations: [lineDotMotion, lineBodyMotion]
})
export class LineComponent implements OnInit, OnDestroy {
  public theme: NgArwesTheme = DEFAULT_THEME;
  private sub: Subscription;

  @Input()
  show = true;

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  constructor(public ThemeSvc: ThemeService) { }

  ngOnInit(): void {
    this.sub = this.ThemeSvc.theme$.subscribe(theme => {
      this.theme = theme;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
