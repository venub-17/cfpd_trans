import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { Observable } from 'rxjs';
import { ModalType } from '../types';

@Component({
  selector: 'app-modal-component',
  imports: [CommonModule],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.scss',
})
export class ModalComponent {
  isOpen$: Observable<boolean>;
  modalContent$: Observable<ModalType>;

  constructor(private modalService: ModalService) {
    this.isOpen$ = this.modalService.isOpen$;
    this.modalContent$ = this.modalService.modalContent$;
  }

  onOpen() {
    this.modalService.open();
  }
  onClose() {
    this.modalService.close();
  }
  onActionButtonClick() {
    this.modalService.onActionButtonClick();
  }
}
