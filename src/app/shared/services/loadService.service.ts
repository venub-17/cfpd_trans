import { Injectable } from '@angular/core';
import { serviceData } from '../../shared/temp/service.data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private selectedService = new BehaviorSubject<any>(null);
  selectedService$ = this.selectedService.asObservable();

  private services = serviceData; // assuming this is an array of services

  /**
   * Select a service by ID and emit it
   */
  selectServiceById(title: string): void {
    const foundService = this.services.find(
      (service) => service.title === title
    );
    this.selectedService.next(foundService ?? null);
  }

  /**
   * Returns a service synchronously by ID (without emitting)
   */
  getServiceById(title: string): any | null {
    return this.services.find((service) => service.title === title) ?? null;
  }

  /**
   * Get all services (if needed)
   */
  getAllServices(): any[] {
    return this.services;
  }
}
