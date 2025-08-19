import { Component, Input } from '@angular/core';
import { CustomerReviewType } from '../../../shared/types';

@Component({
  selector: 'app-customer-review-card',
  imports: [],
  templateUrl: './customer-review-card.html',
  styleUrl: './customer-review-card.scss',
})
export class CustomerReviewCard {
  @Input() review!: CustomerReviewType;
}
