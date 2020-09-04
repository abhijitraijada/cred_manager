import { TestBed } from '@angular/core/testing';

import { T1DbServiceService } from './t1-db-service.service';

describe('T1DbServiceService', () => {
  let service: T1DbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(T1DbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
