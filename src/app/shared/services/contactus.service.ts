import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  postContactus(data: any) {
    return this.http.post(`${this.baseUrl}/contacts`, data);
  }
}
