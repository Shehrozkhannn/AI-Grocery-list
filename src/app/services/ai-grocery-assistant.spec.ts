import { TestBed } from '@angular/core/testing';

import { AiGroceryAssistant } from './ai-grocery-assistant';

describe('AiGroceryAssistant', () => {
  let service: AiGroceryAssistant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiGroceryAssistant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
