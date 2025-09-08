import { Component, OnInit } from '@angular/core';
import { Site } from '../../../shared/types';
import { siteData } from '../../../shared/temp/siteData';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sites',
  imports: [CommonModule],
  templateUrl: './sites.html',
  styleUrl: './sites.scss',
})
export class Sites implements OnInit {
  siteData: Site[] = [];

  constructor(private router: Router) {
    this.siteData = siteData;
  }
  ngOnInit(): void {}
  onSelectSite() {
    this.router.navigate(['/user-details/site']);
  }
}
