import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Otpverify } from '../otpverify/otpverify';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule, FormsModule, Otpverify],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {
  submitted: boolean = false;
  isOtpSent: boolean = false;

  onVerifyEmail(form: any) {
    this.submitted = true;
    if (form.valid) {
      console.log(`Verification email sent to: ${form.value.email}`);
      this.isOtpSent = true;
    }
  }
}
