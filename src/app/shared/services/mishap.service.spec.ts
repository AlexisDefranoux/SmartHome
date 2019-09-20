import { TestBed, inject } from '@angular/core/testing';

import { MishapService } from './mishap.service';

describe('MishapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MishapService]
    });
  });

  it('should be created', inject([MishapService], (service: MishapService) => {
    expect(service).toBeTruthy();
  }));
});
