import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-transformers',
  imports: [],
  templateUrl: './transformers.html',
  styleUrl: './transformers.scss',
})
export class Transformers {
  constructor(private location: Location) {}
  onGoBack() {
    this.location.back();
  }
}
