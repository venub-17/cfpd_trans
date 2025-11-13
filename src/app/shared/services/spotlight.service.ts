import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotlightService {
  private readonly baseUrl = environment.apiUrl;
  private readonly selectedSpotlight = new BehaviorSubject<any>(null);
  selectedSpotlight$ = this.selectedSpotlight.asObservable();

  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  open() {
    this.isOpen.next(true);
  }
  close() {
    this.isOpen.next(false);
  }

  setSelectedSpotlight(spotlight: any) {
    this.selectedSpotlight.next(spotlight);
  }

  constructor(private readonly http: HttpClient) {}

  getSpotlightData() {
    return this.http.get(`${this.baseUrl}/spotlight`);
  }
  postSpotlightData(data: any) {
    return this.http.post(`${this.baseUrl}/spotlight`, data);
  }
  onDeleteSpotlight(id: number) {
    return this.http.delete(`${this.baseUrl}/spotlight/${id}`);
  }
}
