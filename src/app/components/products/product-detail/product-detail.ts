import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/types';
import { RequestQuote } from '../../../shared/modals/request-quote/request-quote';

@Component({
  selector: 'app-product-detail',
  imports: [RequestQuote, CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product!: Product;
  showRequestModal: boolean = false;
  constructor(
    private location: Location,
    private readonly prodcutService: ProductService
  ) {}
  ngOnInit(): void {
    this.prodcutService.showRequestModal$.subscribe((show) => {
      this.showRequestModal = show;
    });
    this.prodcutService.selectedProduct$.subscribe((product) => {
      this.product = product;
    });
    console.log(this.product);
  }
  onGoBack() {
    this.location.back();
  }
  onRequestQuote() {
    this.prodcutService.onshowRequestModal(true);
  }
}
