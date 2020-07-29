import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'arwes-content',
  template: '<ng-content></ng-content>',
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
