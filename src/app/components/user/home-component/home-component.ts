import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
