import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LoaderType } from '../types';

@Component({
  selector: 'app-loader-component',
  imports: [CommonModule],
  templateUrl: './loader-component.html',
  styleUrls: ['./loader-component.scss'],
})
export class LoaderComponent {
  isLoading$: Observable<LoaderType>;

  constructor(private loaderService: LoaderService) {
    this.isLoading$ = this.loaderService.isLoading$;
  }
}
