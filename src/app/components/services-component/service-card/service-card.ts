import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../../../shared/types';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-service-card',
  imports: [],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard implements OnInit {
  @Input() service!: Service;

  constructor(private modalService: ModalService) {}
  ngOnInit(): void {}
  openModal(modal: any) {
    this.modalService.open();
    this.modalService.setContent({
      title: this.service.serviceName,
      content: 'Required Details for raise a service',
      isConfirmButton: false,
    });
  }
}
