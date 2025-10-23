import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';
import { ModalService } from '../../../shared/services/modal.service';

@Injectable({ providedIn: 'root' })
export class ResetTokenGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private readonly modalService: ModalService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = route.queryParamMap.get('token') || ''; // Extract token from query params
    const email = route.queryParamMap.get('email') || '';
    // If no token, redirect
    if (!token || !email) {
      this.modalService.setResContent(
        'Error',
        'Failed to verify reset token. Please try again.'
      );
      void this.router.navigate(['/forgot-password']);
      return of(false);
    }

    return this.auth.verifyResetToken(token, email).pipe(
      map((res) => !!res.valid), // Map the result to a boolean (true/false)
      tap((valid) => {
        if (!valid) {
          // If the token is invalid, navigate to expired-reset page
          void this.router.navigate(['/forgot-password']);
        }
      }),
      catchError((e) => {
        // If there's an error during the verification, navigate to expired-reset
        const message =
          e?.error === 'Token expired' || e?.error === 'Invalid token'
            ? 'Your reset token has expired. Please request a new one.'
            : 'Failed to verify reset token. Please try again.';
        this.modalService.setResContent('Error', message);
        void this.router.navigate(['/expired-reset']);
        return of(false);
      })
    );
  }
}
