import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'na-content',
  template: '<ng-content></ng-content>',
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
