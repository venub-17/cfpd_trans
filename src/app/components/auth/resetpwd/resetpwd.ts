import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ModalService } from '../../../shared/services/modal.service';
import { confirmPasswordValidator } from '../../../shared/utils';

@Component({
  selector: 'app-resetpwd',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './resetpwd.html',
  styleUrl: './resetpwd.scss',
})
export class Resetpwd implements OnInit {
  hasUppercase(arg0: any) {
    throw new Error('Method not implemented.');
  }
  resetForm: FormGroup;
  isFormSubmitted = false;
  showNewPassword = false;
  showConfirmPassword = false;
  token: string | null = null;
  prefilledEmail = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private readonly authservice: AuthService,
    private readonly loader: LoaderService,
    private readonly modal: ModalService,
    private readonly router: Router
  ) {
    this.resetForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // at least one lowercase, one uppercase, one digit, one special char
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: confirmPasswordValidator('newPassword', 'confirmPassword'),
      }
    );
  }

  ngOnInit() {
    // token can be route param or query param depending on how link is formed
    // prefer route param: /reset-password/:token
    this.token = this.route.snapshot.paramMap.get('token');

    // also check query params for fallback: /reset-password?token=...&email=...
    if (!this.token) {
      this.token = this.route.snapshot.queryParamMap.get('token');
    }

    const emailFromQuery = this.route.snapshot.queryParamMap.get('email');
    if (emailFromQuery) {
      this.resetForm.get('email')!.setValue(emailFromQuery);
      this.prefilledEmail = true;
      // optionally keep it readonly in template using [readonly]
    }
  }

  // convenience getter
  get f(): { [key: string]: AbstractControl } {
    return this.resetForm.controls;
  }

  // custom validator to ensure passwords match
  passwordsMatch(group: AbstractControl | null) {
    if (!group) return null;
    const a = group.get('newPassword')?.value;
    const b = group.get('confirmPassword')?.value;
    return a === b ? null : { passwordMismatch: true };
  }

  // returns strength 0..4
  getPasswordStrength(): number {
    const pwd = this.resetForm.get('newPassword')?.value || '';
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  }

  // readable strength text
  getPasswordStrengthLabel(): string {
    const s = this.getPasswordStrength();
    if (s <= 1) return 'Very weak';
    if (s === 2) return 'Weak';
    if (s === 3) return 'Good';
    return 'Strong';
  }

  // Submit handler
  onSubmit() {
    this.isFormSubmitted = true;

    if (!this.token) {
      this.modal.setResContent(
        'Error',
        ' Invalid or missing token. Please request a new password reset.'
      );
      return;
    }

    if (this.resetForm.invalid) return;

    this.loader.show();
    let payloadEmail = '';
    this.authservice.email$.subscribe((email) => {
      if (email) payloadEmail = email;
    });
    const newPassword = this.resetForm.value.newPassword;

    this.authservice
      .resetPassword(payloadEmail, this.token, newPassword)
      .subscribe({
        next: () => {
          this.modal.setResContent(
            'Success',
            'Password has been reset successfully. You can now log in with your new password.Redirecting to login...'
          );
          setTimeout(() => this.router.navigate(['/login']), 1300);
        },
        error: (err) => {
          const message =
            err?.error?.error ??
            err?.message ??
            'Could not reset password. The token may be invalid or expired.';
          this.modal.setResContent('Error', message);
        },
      });
  }
}
