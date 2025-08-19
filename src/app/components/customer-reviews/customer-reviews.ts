import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CustomerReviewType } from '../../shared/types';
import { custmerReviewData } from '../../shared/temp/custmer_review.data';
import { CustomerReviewCard } from './customer-review-card/customer-review-card';

@Component({
  selector: 'app-customer-reviews',
  imports: [CommonModule, CustomerReviewCard],
  templateUrl: './customer-reviews.html',
  styleUrl: './customer-reviews.scss',
})
export class CustomerReviews implements OnInit {
  activeSlideIndex = 0;
  customerReviews: CustomerReviewType[] = [];

  ngOnInit() {
    this.customerReviews = custmerReviewData;
  }

  get visibleTestimonials() {
    const visible = [];
    visible.push(this.customerReviews[this.activeSlideIndex]);

    // Calculate second slide index
    const secondIndex =
      (this.activeSlideIndex + 1) % this.customerReviews.length;
    visible.push(this.customerReviews[secondIndex]);
    const thirdIndex =
      (this.activeSlideIndex + 2) % this.customerReviews.length;
    visible.push(this.customerReviews[thirdIndex]);

    return visible;
  }

  nextSlide() {
    this.activeSlideIndex =
      (this.activeSlideIndex + 1) % this.customerReviews.length;
  }

  prevSlide() {
    this.activeSlideIndex =
      (this.activeSlideIndex - 1 + this.customerReviews.length) %
      this.customerReviews.length;
  }
}
