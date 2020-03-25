import { ThemeService } from '../../services/theme.service';
import { DEFAULT_THEME } from './../../tools/theme';
import { NgArwesTheme } from './../../types/theme';
import { NgArwesLayerStatusEnum } from '../../types/theme';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'arwes-line',
  template: `
    <div class="arwes-line" [style.margin-bottom.px]="theme.margin">
      <div
        class="arwes-line-body"
        [style.border-color]="theme.color[layer].dark"
        [style.transition]="'all ' + theme.animTime + 'ms ease-out'"
      ></div>
      <div
        class="arwes-line-left"
        [style.background-color]="theme.color[layer].dark"
        [style.transition]="
          'all ' + (theme.animTime / 4) * 3 + 'ms ease-out' + theme.animTime / 4
        "
      ></div>
      <div
        class="arwes-line-right"
        [style.background-color]="theme.color[layer].dark"
        [style.transition]="
          'all ' + (theme.animTime / 4) * 3 + 'ms ease-out' + theme.animTime / 4
        "
      ></div>
    </div>
  `,
  styleUrls: ['./line.component.less']
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
    this.sub = this.ThemeSvc.theme.subscribe(theme => {
      this.theme = theme;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
