import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/types';
import { Router } from '@angular/router';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
  @Input() product!: Product;
  constructor(private router: Router, private productService: ProductService) {}
  ngOnInit(): void {}
  onViewDetails(product: Product) {
    this.productService.onSelectProduct(product);
    this.router.navigate(['/products/product-details']);
  }
}
