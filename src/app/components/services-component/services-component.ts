import { Component, OnInit } from '@angular/core';
import { ServiceCard } from './service-card/service-card';
import { Service } from '../../shared/types';
import { serviceData } from '../../shared/temp/service.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-services-component',
  imports: [ServiceCard, CommonModule],
  templateUrl: './services-component.html',
  styleUrl: './services-component.scss',
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  constructor() {}

  ngOnInit(): void {
    this.services = serviceData;
  }
}
