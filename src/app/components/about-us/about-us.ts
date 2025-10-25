import { Component } from '@angular/core';
import { MILESTONES } from '../../shared/temp/aboutData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs {
 timelineData=MILESTONES

}
