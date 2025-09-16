import { Component, OnInit } from '@angular/core';

import { serviceData } from '../../shared/temp/service.data';
import { CommonModule } from '@angular/common';
import { LoadService } from '../../shared/services/loadService.service';
import { ServiceCard } from './service-card/service-card';

@Component({
  selector: 'app-services-component',
  imports: [CommonModule, ServiceCard],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent implements OnInit {
  service: any;
  constructor(private servicesService: LoadService) {}

  ngOnInit(): void {
    this.servicesService.selectedService$.subscribe((data) => {
      this.service = data;
    });
  }
}
