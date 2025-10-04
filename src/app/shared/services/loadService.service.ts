import { Injectable } from '@angular/core';
import { serviceData } from '../../shared/temp/service.data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadService {
  private selectedService = new BehaviorSubject<any>(null);
  selectedService$ = this.selectedService.asObservable();
  serviceData: any[] = serviceData;

  getServie(service: any) {
    this.selectedService.next(service);
  }
}
