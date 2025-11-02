import { Component, OnInit } from '@angular/core';
import { MILESTONES } from '../../shared/temp/aboutData';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AboutusService } from '../../shared/services/aboutus.service';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnInit {
  hero_content: any = {};
  who_we_are_content: any = {};
  milestones_content: any = [];
  certifications_content: any = [];
  team_content: any = [];
  industry_content: any = [];

  constructor(
    private readonly router: Router,
    private aService: AboutusService
  ) {}

  ngOnInit(): void {
    this.aService.getAboutUsData().subscribe((res: any) => {
      if (res && res.data) {
        this.hero_content = res.data.hero;
        this.who_we_are_content = res.data.whoWeAre;
        this.milestones_content = res.data.history.milestones;
      }
    });
  }
  timelineData = MILESTONES;
  onContactus() {
    this.router.navigate(['/contact']);
  }
}
