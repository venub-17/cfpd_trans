import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FAQService {
  private readonly baseUrl = environment.apiUrl;
  constructor(private readonly http: HttpClient) {}
  private showAddFAQModal = new BehaviorSubject<boolean>(false);
  currentAddFAQModalStatus = this.showAddFAQModal.asObservable();

  changeAddFAQModalStatus(status: boolean) {
    this.showAddFAQModal.next(status);
  }

  getFaqData() {
    return this.http.get(`${this.baseUrl}/faqs`);
  }
  getAdminFaqData() {
    return this.http.get(`${this.baseUrl}/faqs/admin/faqs`);
  }
  updateFAQ(faqId: string, faqData: any) {
    return this.http.put(`${this.baseUrl}/faqs/admin/faqs/${faqId}`, faqData);
  }
  createFAQ(faqData: any) {
    return this.http.post(`${this.baseUrl}/faqs/admin/faqs`, faqData);
  }
  deleteFAQ(faqId: string) {
    return this.http.delete(`${this.baseUrl}/faqs/admin/faqs/${faqId}`);
  }
}
