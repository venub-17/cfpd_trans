import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contacts.html',
  styleUrls: ['./contacts.scss'],
})
export class Contacts {
  showAssitanceModal: boolean = false;
  isSubmitting: boolean = false;
  submitSuccess: boolean = false;
  submitError: string | null = null;
  contactFrom: NgForm | undefined;
  constructor(private modalService: ModalService, private http: HttpClient) {}

  onOpenModal() {
    this.modalService.open();
    this.modalService.setContent({
      title: 'Contact Information',
      content: 'Details about the contact will be displayed here.',
      isConfirmButton: false,
    });
  }

  onDelete() {
    this.modalService.open();
    this.modalService.setContent({
      title: 'Contact Information',
      content: 'Details about the contact will be displayed here.',
      isConfirmButton: true,
    });
  }

  onAssitance() {
    this.showAssitanceModal = true;
  }

  closeAssitanceModal() {
    this.showAssitanceModal = false;
  }

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
    form.resetForm();

    if (!form || !form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = null;

    const payload = form.value;

    // Replace '/api/contact' with your real endpoint
    // this.http.post('/api/contact', payload).subscribe({
    //   next: () => {
    //     this.isSubmitting = false;
    //     this.submitSuccess = true;
    //   },
    //   error: () => {
    //     this.isSubmitting = false;
    //     this.submitError = 'Failed to send message. Please try again.';
    //   },
    // });
  }
  clearForm(form: NgForm) {
    form.resetForm();
  }
}
