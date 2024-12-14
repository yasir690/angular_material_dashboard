import { TestBed } from '@angular/core/testing';

import { VehicleserviceService } from './vehicleservice.service';

describe('VehicleserviceService', () => {
  let service: VehicleserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
