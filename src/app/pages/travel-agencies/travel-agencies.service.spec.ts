import { TestBed } from '@angular/core/testing';

import { TravelAgenciesService } from './travel-agencies.service';

describe('TravelAgenciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelAgenciesService = TestBed.get(TravelAgenciesService);
    expect(service).toBeTruthy();
  });
});
