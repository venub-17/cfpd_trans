// ...existing code...
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, map } from 'rxjs';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { LoaderService } from '../../../shared/services/loader.service';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/types';
import { ProductCard } from '../product-card/product-card';
@Component({
  selector: 'app-product-list',
  imports: [ProductCard, CommonModule, FilterPipe, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'], // fixed property name
})
export class ProductList implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  private readonly filterPipe = new FilterPipe();

  constructor(
    private readonly productService: ProductService,
    private loaderService: LoaderService
  ) {}
  pageData: Product[] = [];
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number = 1;

  ngOnInit() {
    this.loaderService.show();
    this.productService
      .getProductData()
      .pipe(
        finalize(() => this.loaderService.hide()),
        map((res) => {
          const payload = res as { data: Product[] };
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
          return payload;
        })
      )
      .subscribe((data: any) => {
        this.products = data.data;
        this.currentPage = 1;
        this.updatePageData();
      });
  }

  private get filteredProducts(): Product[] {
    const result = this.filterPipe.transform(this.products, this.searchText);
    return Array.isArray(result) ? result : [];
  }

  private updatePageData(): void {
    const filtered = this.filteredProducts;
    this.totalPages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pageData = filtered.slice(startIndex, startIndex + this.pageSize);
    console.log('Page Data:', this.pageData, this.currentPage, this.totalPages);
  }

  onSearchChange(value: string): void {
    this.searchText = value;
    this.currentPage = 1;
    this.updatePageData();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageData();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageData();
    }
  }
}
