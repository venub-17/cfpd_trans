import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewCard } from './customer-review-card';

describe('CustomerReviewCard', () => {
  let component: CustomerReviewCard;
  let fixture: ComponentFixture<CustomerReviewCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerReviewCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerReviewCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
