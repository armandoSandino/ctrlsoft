import { TestBed } from '@angular/core/testing';

import { StatementAccountService } from './statement-account.service';

describe('StatementAccountService', () => {
  let service: StatementAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
