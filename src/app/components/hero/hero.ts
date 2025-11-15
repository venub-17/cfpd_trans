import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerReviews } from '../customer-reviews/customer-reviews';
import { Clients } from '../clients/clients';
import { ProductService } from '../../shared/services/product.service';
import { map } from 'rxjs';
import { FAQService } from '../../shared/services/faq.service';
import { RequestQuote } from '../../shared/modals/request-quote/request-quote';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, RequestQuote, CommonModule, CustomerReviews, Clients],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private faqService: FAQService
  ) {}
  showRequestModal: boolean = false;
  activeIndices: Set<number> = new Set();
  activeIndex: any = null;
  products: any[] = [];
  FAQs: any[] = [];
  isService: boolean = false;
  ngOnInit() {
    this.getProducts();
    this.getFaqs();
    this.productService.showRequestModal$.subscribe((show) => {
      this.showRequestModal = show;
    });
  }

  getProducts() {
    this.productService
      .getProductData()
      .pipe(
        map((res: any) => {
          const payload = res;
          payload.data = payload.data.map((p: any) => {
            const raw =
              typeof p.price === 'number'
                ? p.price
                : parseFloat(String(p.price).replace(/[^0-9.-]+/g, ''));
            const display = isNaN(raw)
              ? String(p.price)
              : `$${raw.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`;
            return { ...p, price: display };
          });

          return payload.data.slice(0, 3);
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }
  getFaqs() {
    this.faqService
      .getFaqData()
      .pipe(map((res: any) => res.slice(0, 4)))
      .subscribe((data: any) => {
        this.FAQs = data;
      });
  }

  toggleFaq(index: number): void {
    if (this.activeIndices.has(index)) {
      this.activeIndices.delete(index);
    } else {
      this.activeIndices.add(index);
    }
  }
  onRequestService(): void {
    this.isService = true;
    this.productService.onshowRequestModal(true);
  }
}
