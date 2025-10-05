import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgotpwd',
  imports: [FormsModule, CommonModule],
  templateUrl: './forgotpwd.html',
  styleUrl: './forgotpwd.scss',
})
export class Forgotpwd {
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
