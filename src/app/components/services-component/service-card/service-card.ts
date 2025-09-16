import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../../../shared/types';
import { ModalService } from '../../../shared/services/modal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-card',
  imports: [CommonModule],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard implements OnInit {
  @Input() service!: any;

  constructor(private modalService: ModalService) {}
  ngOnInit(): void {}
  activeItem: any = null; // Holds the currently expanded section

  // Your service data (already provided)

  // Toggle function to open/close the section
  toggle(item: any): void {
    // If the clicked section is already active, collapse it; otherwise, open it
    this.activeItem = this.activeItem === item ? null : item;
  }
}
