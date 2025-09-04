import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Sites } from '../sites/sites';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule, Sites],
  templateUrl: './home-component.html',
  styleUrl: './home-component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
}
