import { Component, OnInit } from '@angular/core';

const FrameSelector = '[arwes-frame]';

@Component({
  selector: FrameSelector,
  styleUrls: ['./frame.component.less'],
  template: `
<ng-content></ng-content>
`,
})
export class FrameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
