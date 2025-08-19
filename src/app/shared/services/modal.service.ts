import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalType } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();
  private modalContent = new BehaviorSubject<ModalType>({
    title: '',
    content: '',
    isConfirmButton: false,
  });
  modalContent$ = this.modalContent.asObservable();

  private actionButton = new BehaviorSubject<() => void>(() => {});
  actionButton$ = this.actionButton.asObservable();
  setContent(content: ModalType) {
    this.modalContent.next(content);
  }
  open() {
    this.isOpen.next(true);
  }
  close() {
    this.isOpen.next(false);
  }
  setActionButton(action: () => void) {
    this.actionButton.next(action);
  }

  onActionButtonClick() {
    this.actionButton.value();
  }
}
