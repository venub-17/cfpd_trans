import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}

  getFaqData() {
    return this.http.get(`${this.baseUrl}/faqs`);
  }
  getAdminFaqData() {
    return this.http.get(`${this.baseUrl}/admin/faqs`);
  }
}
