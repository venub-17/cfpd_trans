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
          void this.router.navigate(['/expired-reset']);
        }
      }),
      catchError(() => {
        // If there's an error during the verification, navigate to expired-reset
        this.modalService.setResContent(
          'Error',
          'Failed to verify reset token. Please try again.'
        );
        void this.router.navigate(['/expired-reset']);
        return of(false);
      })
    );
    // Check if email exists, and if so, validate the token
    // return this.auth.email$.pipe(
    //   take(1), // Take only the first emission
    //   switchMap((email) => {
    //     if (!email) {
    //       // If email is not available, redirect to home
    //       void this.router.navigate(['/']);
    //       return of(false);
    //     }
    //     // Verify the token with the email

    //   })
    // );
  }
}
