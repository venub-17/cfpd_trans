import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { LoaderService } from '../../services/loader.service';
import { ProductService } from '../../services/product.service';
import { ModalService } from '../../services/modal.service';
import { finalize } from 'rxjs';
import { ServiceDataService } from '../../services/service-data.service';

@Component({
  selector: 'app-request-quote',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './request-quote.html',
  styleUrl: './request-quote.scss',
})
export class RequestQuote {
  isFormSubmitted = false;
  showPassword: boolean = false;
  count: number = 1;
  requestForm!: FormGroup;
  services: any[] = [];

  @Input() id!: string | number;
  @Input() isService: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly loaderService: LoaderService,
    private readonly productService: ProductService,
    private readonly modal: ModalService,
    private servicesService: ServiceDataService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getServices();
  }
  initForm() {
    this.requestForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\+?[0-9\s\-()]{7,}$/),
      ]),
      service: new FormControl(''),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
    });
  }
  get f() {
    return this.requestForm.controls;
  }
  getServices() {
    this.servicesService.getAllServices().subscribe((services) => {
      this.services = services;
    });
  }
  onSubmit() {
    if (!this.requestForm.valid) {
      this.requestForm.markAllAsTouched();
      return;
    }
    if (this.isService) {
      this.isFormSubmitted = true;

      this.loaderService.show();
      this.servicesService
        .postRequestQuote(this.requestForm.value)
        .pipe(
          finalize(() => {
            this.loaderService.hide(), this.requestForm.reset();
          })
        )
        .subscribe({
          next: (res) => {
            this.modal.setResContent(
              'Success',
              'Request Quote Submitted Successfully'
            );
          },
          error: (err) => {
            const errorMessage = err?.error?.message || 'Something went wrong';
            this.modal.setResContent('Error', errorMessage);
          },
        });
    } else {
      this.isFormSubmitted = true;

      const reqBody = {
        customerName:
          this.requestForm.value.firstName +
          ' ' +
          this.requestForm.value.lastName,
        email: this.requestForm.value.email,
        phone: this.requestForm.value.phone,
        quantity: this.count,
        message: this.requestForm.value.description,
      };
      this.loaderService.show();
      this.productService
        .postRequestQuote(reqBody, this.id)
        .pipe(finalize(() => this.loaderService.hide()))
        .subscribe({
          next: (res) => {
            this.modal.setResContent(
              'Success',
              'Request Quote Submitted Successfully'
            );
          },
          error: (err) => {
            const errorMessage = err?.error?.message || 'Something went wrong';
            this.modal.setResContent('Error', errorMessage);
          },
        });
    }
  }
  onDecrease() {
    if (this.count > 1) {
      this.count--;
    } else {
      this.count = 1;
    }
  }
  onIncrease() {
    this.count++;
  }
  onClose() {
    this.productService.onshowRequestModal(false);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
