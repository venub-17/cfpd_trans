import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Otpverify } from '../otpverify/otpverify';
import { AuthService } from '../../../shared/services/auth.service';
import { ModalService } from '../../../shared/services/modal.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { finalize, take } from 'rxjs/operators';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, FormsModule, Otpverify],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {
  submitted: boolean = false;
  isOtpSent: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly loaderService: LoaderService
  ) {}

  onVerifyEmail(form: NgForm) {
    this.submitted = true;
    if (!form.valid) {
      return;
    }
    this.authService.setEmail(form.value.email);
    this.loaderService.show();
    const reqBody = { email: form.value.email };
    this.authService
      .onSignup(reqBody)
      .pipe(
        take(1),
        finalize(() => this.loaderService.hide())
      )
      .subscribe({
        next: (res: any) => {
          const message =
            res?.message ?? 'OTP sent to email. Verify to complete signup.';
          this.isOtpSent = true;
          this.modalService.setResContent('Success', message);
        },
        error: (err: any) => {
          console.error('Signup error:', err);
          const message =
            err?.error?.error ?? err?.message ?? 'An error occurred';
          this.modalService.setResContent('Error', message);
        },
      });
  }
}
