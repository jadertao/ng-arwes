/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoadService } from './load.service';

describe('Service: Load', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadService]
    });
  });

  it('should ...', inject([LoadService], (service: LoadService) => {
    expect(service).toBeTruthy();
  }));
});
