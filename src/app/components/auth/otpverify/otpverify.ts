import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private readonly router: Router) {}
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
    const otp = this.otpValues.join('');
    alert(`Submitted OTP: ${otp}`);
    this.router.navigate(['/signup']);
  }
}
