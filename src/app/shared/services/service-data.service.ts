import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiceDataService {
  private baseUrl = environment.apiUrl;

  private selectedService = new BehaviorSubject<any>(null);
  selectedService$ = this.selectedService.asObservable();

  private services: any[] = [];
  private servicesSubject = new BehaviorSubject<any[]>([]);
  services$ = this.servicesSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  async loadServices(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<any[]>(`${this.baseUrl}/services/data`)
      );
      this.services = data ?? [];
      this.servicesSubject.next(this.services);
    } catch (err) {
      this.services = [];
      this.servicesSubject.next(this.services);
      console.error('Failed to load services', err);
    }
  }

  getAllServices(): Observable<any[]> {
    return this.services$;
  }

  selectServiceById(title: string): void {
    const foundService = this.services.find(
      (service) => service.title === title
    );
    this.selectedService.next(foundService ?? null);
  }

  getServiceById(title: string): any | null {
    return this.services.find((service) => service.title === title) ?? null;
  }
}
