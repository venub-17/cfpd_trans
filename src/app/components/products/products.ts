import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
// import { ProductFilters } from './product-filters/product-filters';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-products',
  imports: [ProductList],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  constructor() {}

  ngOnInit() {}
}
