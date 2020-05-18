import { Component, OnInit } from '@angular/core';

const ListSelector = 'dl[arwes-list], ol[arwes-list], ul[arwes-list]';

@Component({
  selector: ListSelector,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
