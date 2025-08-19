import { Component } from '@angular/core';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-contacts',
  imports: [],
  templateUrl: './contacts.html',
  styleUrl: './contacts.scss',
})
export class Contacts {
  constructor(private modalService: ModalService) {}
  onOpenModal() {
    this.modalService.open();
    this.modalService.setContent({
      title: 'Contact Information',
      content: 'Details about the contact will be displayed here.',
      isConfirmButton: false,
    });
    // Logic to open modal can be added here
  }
  onDelete() {
    this.modalService.open();
    this.modalService.setContent({
      title: 'Contact Information',
      content: 'Details about the contact will be displayed here.',
      isConfirmButton: true,
    });
  }
}
