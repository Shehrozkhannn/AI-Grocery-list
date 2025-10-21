import { TestBed } from '@angular/core/testing';

import { Grocery } from './grocery';

describe('Grocery', () => {
  let service: Grocery;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Grocery);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
