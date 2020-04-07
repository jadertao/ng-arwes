import { NgArwesLayerStatusEnum } from '../../types/theme.enums';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'arwes-footer',
  styleUrls: ['./footer.component.less'],
  template: `<div><ng-content></ng-content></div>`,
})
export class FooterComponent implements OnInit {
  @Input()
  show = true;

  constructor() { }

  ngOnInit() {
  }

}
