import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviews } from './customer-reviews';

describe('CustomerReviews', () => {
  let component: CustomerReviews;
  let fixture: ComponentFixture<CustomerReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerReviews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReviews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
