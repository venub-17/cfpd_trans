import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { ProductFilters } from './product-filters/product-filters';
import { ProductList } from './product-list/product-list';

@Component({
  selector: 'app-products',
  imports: [ProductFilters, ProductList],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit() {}
  onOpenModal() {
    this.modalService.open();
    this.modalService.setContent({
      title: 'Product Information',
      content: 'Details about the product will be displayed here.',
      isConfirmButton: true,
    });
    this.modalService.setActionButton(() => this.onDelete());
  }

  onDelete() {
    console.log('Product deleted');
    this.modalService.close();
  }
  onActionButtonClick() {
    this.modalService.onActionButtonClick();
  }
}
