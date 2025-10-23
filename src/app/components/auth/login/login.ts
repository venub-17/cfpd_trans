import { Component, OnInit } from '@angular/core';
import { LoginType } from '../../../shared/types';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { finalize, take } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  loginDetails: LoginType = { username: '', password: '' };
  loginForm!: FormGroup;
  isFormSubmitted: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private readonly loaderService: LoaderService,
    private readonly modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const strictEmailPattern =
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[A-Za-z]{2,}$';

    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(strictEmailPattern),
      ]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false),
    });
  }

  get f() {
    return this.loginForm.controls;
  }
  private navigateToUserDetails() {
    this.router.navigate(['/user-details']);
  }
  private openModal(title: string, content: string, isConfirmButton = false) {
    this.modalService.setContent({ title, content, isConfirmButton });
    this.modalService.open();
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    this.loaderService.show();
    this.authService
      .onLogin(this.loginForm.value)
      .pipe(
        take(1),
        finalize(() => this.loaderService.hide())
      )
      .subscribe({
        next: () => this.navigateToUserDetails(),
        error: (err) => {
          console.error('Login error:', err);
          const message =
            err?.error?.error ??
            err?.message ??
            'An error occurred during login';
          this.openModal('Error', message);
        },
      });
  }
}
