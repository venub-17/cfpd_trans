import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ServiceDataService } from '../../shared/services/service-data.service';
import { ServiceCard } from './service-card/service-card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-services-component',
  imports: [CommonModule, ServiceCard],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent implements OnInit {
  serviceTitle: string | any;
  service: any;
  constructor(
    private servicesService: ServiceDataService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.serviceTitle = params.get('id');
      if (this.serviceTitle) {
        this.service = this.servicesService.getServiceById(this.serviceTitle);
      }
    });
  }
}
