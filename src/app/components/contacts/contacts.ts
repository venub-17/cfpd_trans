import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ContactusService } from '../../shared/services/contactus.service';
import { LoaderService } from '../../shared/services/loader.service';
import { finalize } from 'rxjs';

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
  constructor(
    private modalService: ModalService,
    private conactService: ContactusService,
    private loader: LoaderService
  ) {}

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
    if (!form || !form.valid) {
      form.control.markAllAsTouched();
      return;
    }

    this.loader.show();
    this.isSubmitting = true;
    this.submitError = null;

    const payload = form.value;

    this.conactService
      .postContactus(payload)
      .pipe(
        finalize(() => {
          this.loader.hide();
          form.resetForm();
        })
      )
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.modalService.setResContent(
            'Success',
            'Your message has been sent successfully.'
          );
        },
        error: (err) => {
          this.isSubmitting = false;
          this.modalService.setResContent(
            'Error',
            'Some internal issue please try again'
          );
        },
      });
  }
  clearForm(form: NgForm) {
    form.resetForm();
  }
}
