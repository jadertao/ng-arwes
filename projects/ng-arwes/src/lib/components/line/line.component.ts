import { DEFAULT_THEME } from './../../tools/theme';
import { NgArwesTheme } from './../../types/theme';
import { NgArwesLayerStatusEnum } from '../../types/theme';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'arwes-line',
  template: `
<div class="arwes-line">
  <div class="arwes-line-body"></div>
  <div class="arwes-line-left"></div>
  <div class="arwes-line-right"></div>
</div>
  `,
  styleUrls: ['./line.component.less']
})
export class LineComponent implements OnInit {
  @Input()
  show = true;

  @Input()
  layer = NgArwesLayerStatusEnum.Primary;

  @Input()
  theme = DEFAULT_THEME;

  constructor() { }

  ngOnInit(): void {
  }

}
