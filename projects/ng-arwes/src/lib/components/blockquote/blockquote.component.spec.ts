/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlockquoteComponent } from './blockquote.component';

describe('BlockquoteComponent', () => {
  let component: BlockquoteComponent;
  let fixture: ComponentFixture<BlockquoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockquoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
