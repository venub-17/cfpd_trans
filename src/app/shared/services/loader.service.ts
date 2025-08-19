import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading = new BehaviorSubject<LoaderType>({
    isLoading: false,
    message: '',
  });
  isLoading$ = this.isLoading.asObservable();

  show(message: string = 'Loading...') {
    this.isLoading.next({ isLoading: true, message });
  }

  hide() {
    this.isLoading.next({ isLoading: false, message: '' });
  }
}
