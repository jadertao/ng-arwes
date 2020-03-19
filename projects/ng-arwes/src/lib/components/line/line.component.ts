import { NgArwesLayerStatusEnum } from '../../types/theme';
import { Component, OnInit, Input } from '@angular/core';

export interface ArwesLineClasses {
  left?: string;
  right?: string;
  line?: string;
}


@Component({
  selector: 'arwes-line',
  template: `
<div>
  line
  <div class="{{ classes.line }}"></div>
  <div class="{{ classes.left }}"></div>
  <div class="{{ classes.right }}"></div>
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
  classes: ArwesLineClasses = {};

  constructor() { }

  ngOnInit(): void {
  }

}
