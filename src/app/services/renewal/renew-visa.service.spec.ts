import { TestBed } from '@angular/core/testing';

import { RenewVisaService } from './renew-visa.service';

describe('RenewVisaService', () => {
  let service: RenewVisaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenewVisaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
