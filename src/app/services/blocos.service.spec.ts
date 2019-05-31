import { TestBed } from '@angular/core/testing';

import { BlocosService } from './blocos.service';

describe('BlocosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocosService = TestBed.get(BlocosService);
    expect(service).toBeTruthy();
  });
});
