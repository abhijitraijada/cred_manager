import { TestBed } from '@angular/core/testing';

import { T2DbServiceService } from './t2-db-service.service';

describe('T2DbServiceService', () => {
  let service: T2DbServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(T2DbServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
