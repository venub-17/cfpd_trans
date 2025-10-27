import { Component, OnInit } from '@angular/core';
import { MILESTONES } from '../../shared/temp/aboutData';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}
  timelineData = MILESTONES;
  onContactus() {
    this.router.navigate(['/contact']);
  }
}
