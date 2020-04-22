import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arwes-paragraph',
  styleUrls: ['./paragraph.component.less'],
  template: `
<ng-content></ng-content>
`,
})
export class ParagraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
