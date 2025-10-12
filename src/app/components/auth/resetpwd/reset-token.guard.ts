import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable({ providedIn: 'root' })
export class ResetTokenGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const token = (route.paramMap.get('token') || '').trim();
    const email = '';
    this.auth.email$.subscribe((email) => {
      if (email) {
        email = email;
      }
    });
    if (!token || !email) {
      void this.router.navigate(['/']);
      return of(false);
    }

    return this.auth.verifyResetToken(token, email).pipe(
      take(1),
      map((res) => !!res.valid),
      tap((valid) => {
        if (!valid) void this.router.navigate(['/expired-reset']);
      }),
      catchError(() => {
        void this.router.navigate(['/expired-reset']);
        return of(false);
      })
    );
  }
}
