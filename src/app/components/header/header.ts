import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Service } from '../../shared/types';
import { serviceData } from '../../shared/temp/service.data';
import { AuthService } from '../../shared/services/auth.service';
import { LoadService } from '../../shared/services/loadService.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;
  openDropdown: string = '';
  services: any[] = [];
  toggleState: boolean = false;
  constructor(
    private router: Router,
    public authService: AuthService,
    private servicesService: LoadService
  ) {
    this.services = serviceData;
  }
  ngOnInit(): void {}
  onToggleMenu() {
    this.toggleState = !this.toggleState;
  }
  onSelectService(service: any) {
    this.servicesService.getServie(service);
    this.router.navigate(['/services']);
  }
}
