import { TestBed } from '@angular/core/testing';

import { TravelAgencyService } from './travel-agency.service';

describe('TravelAgencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelAgencyService = TestBed.get(TravelAgencyService);
    expect(service).toBeTruthy();
  });
});
