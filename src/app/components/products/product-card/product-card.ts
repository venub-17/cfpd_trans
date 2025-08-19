import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../shared/types';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard implements OnInit {
  @Input() product!: Product;
  constructor(private router: Router) {}
  ngOnInit(): void {}
}
