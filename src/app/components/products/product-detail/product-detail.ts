import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/types';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product!: Product;
  constructor(
    private location: Location,
    private readonly prodcutService: ProductService
  ) {}
  ngOnInit(): void {
    this.prodcutService.selectedProduct$.subscribe((product) => {
      console.log('Selected product from service:', product);
      this.product = product;
    });
  }
  onGoBack() {
    this.location.back();
  }
}
