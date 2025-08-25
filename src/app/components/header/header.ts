import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Service } from '../../shared/types';
import { serviceData } from '../../shared/temp/service.data';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;
  openDropdown: string = '';
  services: Service[] = [];
  ngOnInit(): void {}
  constructor(private router: Router) {
    this.services = serviceData;
  }
  toggleState: boolean = false;
  onToggleMenu() {
    this.toggleState = !this.toggleState;
  }
  onToggleDropdown(name: string) {
    this.openDropdown = name ? name : '';
  }
}
