import { NgArwesLayerStatusEnum } from '../../types/theme';
import { Component, OnInit, Input } from '@angular/core';

export interface ArwesLineClasses {
  left?: string;
  right?: string;
  line?: string;
}


@Component({
  selector: 'arwes-line',
  templateUrl: './line.component.html',
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
