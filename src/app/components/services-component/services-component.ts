import { Component, OnInit } from '@angular/core';

import { serviceData } from '../../shared/temp/service.data';
import { CommonModule } from '@angular/common';
import { LoadService } from '../../shared/services/loadService.service';
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
    private servicesService: LoadService,
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
