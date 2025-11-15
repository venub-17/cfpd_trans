import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiUrl;
  private readonly selectedProduct = new BehaviorSubject<any>(null);
  selectedProduct$ = this.selectedProduct.asObservable();
  private readonly showRequestModal = new BehaviorSubject<boolean>(false);
  showRequestModal$ = this.showRequestModal.asObservable();

  onshowRequestModal(show: boolean) {
    this.showRequestModal.next(show);
  }

  constructor(private readonly http: HttpClient) {}
  onSelectProduct(product: any) {
    this.selectedProduct.next(product);
  }
  getProductData(limit?: number) {
    return this.http.get(`${this.baseUrl}/products`);
  }
  postRequestQuote(reqBody: any, id: string | number) {
    return this.http.post(
      `${this.baseUrl}/products/${id}/request-quote`,
      reqBody
    );
  }
}
