import { Component, OnInit } from '@angular/core';
import { SpotlightService } from '../../shared/services/spotlight.service';

@Component({
  selector: 'app-news-spotlight',
  imports: [],
  templateUrl: './news-spotlight.html',
  styleUrl: './news-spotlight.scss',
})
export class NewsSpotlight implements OnInit {
  constructor(private spotlightService: SpotlightService) {}

  ngOnInit(): void {
    this.spotlightService.getSpotlightData().subscribe((data) => {
      console.log('Spotlight Data:', data);
    });
  }
}
