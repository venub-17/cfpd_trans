import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Service } from '../../shared/types';
import { serviceData } from '../../shared/temp/service.data';
import { AuthService } from '../../shared/services/auth.service';
import { ServiceDataService } from '../../shared/services/service-data.service';

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
    public router: Router,
    public authService: AuthService,
    private servicesService: ServiceDataService
  ) {
    this.services = serviceData;
  }
  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe((services) => {
      this.services = services;
      console.log(this.services);
    });
  }
  onToggleMenu() {
    this.toggleState = !this.toggleState;
  }
  onSelectService(service: any) {
    this.servicesService.selectServiceById(service.title);
    this.router.navigate(['/services', service.title]);
  }
}
