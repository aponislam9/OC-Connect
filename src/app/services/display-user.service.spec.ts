import { TestBed } from '@angular/core/testing';

import { DisplayUserService } from './display-user.service';

describe('DisplayUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayUserService = TestBed.get(DisplayUserService);
    expect(service).toBeTruthy();
  });
});
