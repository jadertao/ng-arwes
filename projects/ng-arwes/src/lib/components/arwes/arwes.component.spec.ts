/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArwesComponent } from './arwes.component';

describe('ArwesComponent', () => {
  let component: ArwesComponent;
  let fixture: ComponentFixture<ArwesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArwesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArwesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
