import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { finalize } from 'rxjs/operators';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-forgotpwd',
  imports: [FormsModule, CommonModule],
  templateUrl: './forgotpwd.html',
  styleUrl: './forgotpwd.scss',
})
export class Forgotpwd {
  submitted: boolean = false;
  isOtpSent: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly loader: LoaderService,
    private readonly modalService: ModalService
  ) {}
  onVerifyEmail(form: any) {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.authService.setEmail(form.value.email);
    this.loader.show();
    this.authService
      .requestPasswordReset({ email: form.value.email })
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (res) => {
          const message = res?.message ?? 'Password reset link sent to email';
          this.modalService.setResContent('Success', message);
          this.isOtpSent = true;
          this.submitted = false;
        },
        error: (err) => {
          const message =
            err?.error?.error ?? err?.message ?? 'An error occurred';
          this.modalService.setResContent('Error', message);
          this.submitted = false;
        },
      });
  }
}
