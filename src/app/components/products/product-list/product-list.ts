import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/types';
import { ProductCard } from '../product-card/product-card';
import { CommonModule } from '@angular/common';
import { productData } from '../../../shared/temp/product-data';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, CommonModule, FilterPipe, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  ngOnInit() {
    // Initialize product list with some sample data
    this.products = productData;
  }
}
