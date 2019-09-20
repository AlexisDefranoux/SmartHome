import { TestBed, inject } from '@angular/core/testing';

import { SeverityService } from './severity.service';

describe('SeverityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeverityService]
    });
  });

  it('should be created', inject([SeverityService], (service: SeverityService) => {
    expect(service).toBeTruthy();
  }));
});
