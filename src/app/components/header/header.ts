import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;
  ngOnInit(): void {}
  constructor(private router: Router) {}
  toggleState: boolean = false;
  onToggleMenu() {
    this.toggleState = !this.toggleState;
  }
}
