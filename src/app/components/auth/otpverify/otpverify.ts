import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { finalize } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-otpverify',
  imports: [],
  templateUrl: './otpverify.html',
  styleUrl: './otpverify.scss',
})
export class Otpverify {
  otpValues: string[] = ['', '', '', '', '', ''];

  @ViewChildren('otp0, otp1, otp2, otp3,otp4,otp5')
  otpInputs!: QueryList<ElementRef>;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly loaderService: LoaderService
  ) {}
  onInput(event: any, index: number) {
    const input = event.target;
    let value = input.value;

    // Allow only digits
    if (!/^\d*$/.test(value)) {
      input.value = '';
      this.otpValues[index] = '';
      return;
    }

    this.otpValues[index] = value;

    if (value && index < this.otpValues.length - 1) {
      this.focusInput(index + 1);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      this.focusInput(index - 1);
    }
  }

  focusInput(index: number) {
    const inputsArray = this.otpInputs.toArray();
    inputsArray[index]?.nativeElement.focus();
  }

  isOtpComplete() {
    return this.otpValues.every((val) => val.length === 1);
  }

  submitOtp() {
    this.loaderService.show();
    const email = '';
    this.authService.email$.subscribe((email) => {
      if (email) {
        email = email;
      }
    });
    const otp = this.otpValues.join('');
    this.authService
      .verifyOtp({ email, otp })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          const message = res.message ?? 'OTP verification successful';
          this.modalService.setResContent('Success', message);
          this.router.navigate(['/signup']);
        },
        error: (err) => {
          const message =
            err?.error?.error ?? err?.message ?? 'OTP verification failed';
          this.modalService.setResContent('Error', message);
        },
      });
  }
}
