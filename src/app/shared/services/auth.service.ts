import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedInStatus.asObservable();

  setLoginStatus(status: boolean) {
    this.loggedInStatus.next(status);
  }
}
