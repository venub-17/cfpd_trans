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
  meet_team_content: any = [];

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
        this.meet_team_content = res.data.whoWeAre.resourceMembers;
        this.certifications_content = res.data.safety.practices.filter(
          (item: any) => item.type === 'license_certification'
        );
        this.team_content = res.data.team;
        this.industry_content = res.data.industries;
      }
      console.log('About Us Data:', this.certifications_content);
    });
  }
  timelineData = MILESTONES;
  onContactus() {
    this.router.navigate(['/contact']);
  }
}
