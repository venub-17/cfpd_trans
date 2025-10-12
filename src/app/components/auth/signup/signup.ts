import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../../shared/utils';
import { AuthService } from '../../../shared/services/auth.service';
import { LoaderService } from '../../../shared/services/loader.service';
import { ModalService } from '../../../shared/services/modal.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
})
export class Signup implements OnInit {
  isFormSubmitted = false;

  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly modalService: ModalService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.signupForm = this.fb.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        acceptTerms: new FormControl(false, Validators.requiredTrue),
      },
      {
        validators: confirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.signupForm.invalid) {
      return;
    }
    this.loaderService.show();
    this.authService
      .onCompleteRegisetration({
        email: this.f['email'].value,
        first_name: this.f['firstName'].value,
        last_name: this.f['lastName'].value,
        password: this.f['password'].value,
      })
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          const message =
            res?.message ||
            'Registration successful! Please login to continue.';
          this.modalService.setResContent('Success', message);
          this.signupForm.reset();
          this.isFormSubmitted = false;
        },
        error: (err) => {
          const message =
            err?.error?.error ??
            err?.message ??
            'Something went wrong, please try again.';
          this.modalService.setResContent('Error', message);
        },
      });
  }
}
