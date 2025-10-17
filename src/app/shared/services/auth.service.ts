import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { authReqBody } from '../types';
interface AuthResponse {
  token?: string;
  message?: string;
  [key: string]: any;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;
  private readonly STORAGE_KEY = 'cfpd_isLoggedIn';
  private readonly TOKEN_KEY = 'cfpd_authToken';
  private readonly emailSubject = new BehaviorSubject<string>('');
  public readonly email$ = this.emailSubject.asObservable();

  constructor(private http: HttpClient) {
    // On app load, restore email from localStorage if available
    const savedEmail = localStorage.getItem('resetEmail');
    if (savedEmail) {
      this.emailSubject.next(savedEmail);
    }
  }

  public setEmail(email: string): void {
    localStorage.setItem('resetEmail', email); // Store for future
    this.emailSubject.next(email);
  }

  public clearEmail(): void {
    localStorage.removeItem('resetEmail');
    this.emailSubject.next('');
  }

  public getEmail(): string {
    return this.emailSubject.getValue();
  }

  private readonly loggedInStatus = new BehaviorSubject<boolean>(
    this.getInitialLoginState()
  );

  public readonly isLoggedIn$ = this.loggedInStatus
    .asObservable()
    .pipe(distinctUntilChanged());

  private getInitialLoginState(): boolean {
    const v = localStorage.getItem(this.STORAGE_KEY);
    return v === '1' || v === 'true';
  }

  public setLoginStatus(status: boolean): void {
    this.loggedInStatus.next(status);
    localStorage.setItem(this.STORAGE_KEY, status ? '1' : '0');
  }

  public onSignup(data: authReqBody): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/signup`, data);
  }

  public verifyOtp(data: {
    email: string;
    otp: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/verify-otp`,
      data
    );
  }

  public onCompleteRegisetration(data: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/complete-registration`,
      data
    );
  }

  public onLogin(data: authReqBody): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, data)
      .pipe(
        tap((res) => {
          if (res?.token) {
            localStorage.setItem(this.TOKEN_KEY, res.token);
            this.setLoginStatus(true);
          }
        })
      );
  }
  public requestPasswordReset(
    data: authReqBody
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/auth/request-reset`,
      data
    );
  }

  public verifyResetToken(
    token: string,
    email: string
  ): Observable<{ valid: boolean; email?: string }> {
    console.log(
      'AuthService: Verifying reset token:',
      token,
      'for email:',
      email
    );
    const params = new HttpParams().set('token', token).set('email', email);
    return this.http.get<{ valid: boolean; email?: string }>(
      `${this.baseUrl}/auth/verify-reset-token`,
      { params }
    );
  }
  public resetPassword(
    email: string,
    token: string,
    newPassword: any
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/auth/reset-password`,
      { email, token, newPassword }
    );
  }
  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.setLoginStatus(false);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
