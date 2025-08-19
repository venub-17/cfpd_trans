import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerReviews } from '../customer-reviews/customer-reviews';
import { Clients } from '../clients/clients';

@Component({
  selector: 'app-hero',
  imports: [RouterLink, CommonModule, CustomerReviews, Clients],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  ngOnInit() {}
}
