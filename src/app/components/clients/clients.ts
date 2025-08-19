import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { allClientImages } from '../../shared/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  imports: [CommonModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  allClientImages: string[] = [];
  ngOnInit(): void {
    this.allClientImages = allClientImages;
  }
}
