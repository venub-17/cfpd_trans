import { Component } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { allClientImages } from '../../shared/constants';
import { CommonModule } from '@angular/common';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-clients',
  imports: [CommonModule],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  allClientImages: any[] = [];
  constructor(
    public loaderService: LoaderService,
    private readonly companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.allClientImages = allClientImages;
    this.companyService.getCompanyDate().subscribe((data) => {
      this.allClientImages = data as any[];
      console.log(this.allClientImages[0].icon_url);
    });
  }
}
