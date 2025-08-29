import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CustomerReviews } from '../customer-reviews/customer-reviews';
import { Clients } from '../clients/clients';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [
    RouterLink,
    CommonModule,
    CustomerReviews,
    Clients,
    TranslateModule,
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero implements OnInit {
  ngOnInit() {}
}
