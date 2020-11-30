import { TestBed } from '@angular/core/testing';

import { PriceProductService } from './price-product.service';

describe('PriceProductService', () => {
  let service: PriceProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
