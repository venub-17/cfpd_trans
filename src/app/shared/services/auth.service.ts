import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { authReqBody } from '../types';

interface AuthResponse {
  token?: string;
  message?: string;
  role?: string;
  email?: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiUrl;
  private readonly STORAGE_KEY = 'cfpd_isLoggedIn';
  private readonly TOKEN_KEY = 'cfpd_authToken';
  private readonly ROLE_KEY = 'role';
  private readonly EMAIL_KEY = 'cfpd_userEmail';

  private loggedInStatus = new BehaviorSubject<boolean>(
    this.getInitialLoginState()
  );
  private userRole = new BehaviorSubject<string>(this.getInitialUserRole());

  public readonly isLoggedIn$ = this.loggedInStatus
    .asObservable()
    .pipe(distinctUntilChanged());
  public readonly userRole$ = this.userRole
    .asObservable()
    .pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient) {}

  public setEmail(email: string): void {
    localStorage.setItem(this.EMAIL_KEY, email);
  }

  public getEmail(): any {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  private getInitialLoginState(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) === '1';
  }

  private getInitialUserRole(): string {
    return localStorage.getItem(this.ROLE_KEY) ?? '';
  }

  public setLoginStatus(
    status: boolean,
    role: string,
    email: string,
    token: string
  ): void {
    this.loggedInStatus.next(status);
    this.userRole.next(role);
    localStorage.setItem(this.STORAGE_KEY, status ? '1' : '0');
    localStorage.setItem(this.ROLE_KEY, role);
    localStorage.setItem(this.EMAIL_KEY, email);
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public logout(): void {
    this.setLoginStatus(false, '', '', '');
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
          if (res?.token && res?.role && res?.email) {
            this.setLoginStatus(true, res.role, res.email, res.token);
          }
        })
      );
  }

  public requestPasswordReset(data: {
    email: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/auth/request-reset`,
      data
    );
  }

  public verifyResetToken(
    token: string,
    email: string
  ): Observable<{ valid: boolean; email?: string }> {
    const params = new HttpParams().set('token', token).set('email', email);
    return this.http.get<{ valid: boolean; email?: string }>(
      `${this.baseUrl}/auth/verify-reset-token`,
      { params }
    );
  }

  public resetPassword(
    email: string,
    token: string,
    newPassword: string
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl}/auth/reset-password`,
      {
        email,
        token,
        newPassword,
      }
    );
  }
}
