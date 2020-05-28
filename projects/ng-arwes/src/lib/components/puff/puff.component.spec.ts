/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PuffComponent } from './puff.component';

describe('PuffComponent', () => {
  let component: PuffComponent;
  let fixture: ComponentFixture<PuffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
