import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginsGuard } from './logins.guard';

describe('loginsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
