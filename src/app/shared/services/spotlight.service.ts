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

  setSelectedSpotlight(spotlight: any) {
    this.selectedSpotlight.next(spotlight);
  }

  constructor(private readonly http: HttpClient) {}

  getSpotlightData() {
    return this.http.get(`${this.baseUrl}/spotlight`);
  }
}
