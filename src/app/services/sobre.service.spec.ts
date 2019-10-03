import { TestBed } from '@angular/core/testing';

import { SobreService } from './sobre.service';

describe('SobreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SobreService = TestBed.get(SobreService);
    expect(service).toBeTruthy();
  });
});
