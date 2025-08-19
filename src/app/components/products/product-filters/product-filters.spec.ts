import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilters } from './product-filters';

describe('ProductFilters', () => {
  let component: ProductFilters;
  let fixture: ComponentFixture<ProductFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
