// ...existing code...
import { Component, OnInit, Inject } from '@angular/core';
import { SpotlightService } from '../../shared/services/spotlight.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { finalize } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { AddNeweventComponent } from './addNewevent.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-news-spotlight',
  imports: [CommonModule, FormsModule, AddNeweventComponent],
  templateUrl: './news-spotlight.html',
  styleUrl: './news-spotlight.scss',
})
export class NewsSpotlight implements OnInit {
  constructor(
    private spotlightService: SpotlightService,
    private readonly router: Router,
    private readonly loader: LoaderService,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}
  fullData: any[] = [];
  filteredData: any[] = [];
  pagedData: any[] = [];

  searchText: string = '';
  activeFilter = 'all';

  dateFrom: string | null = null;
  dateTo: string | null = null;

  pageSize = 6;
  currentPage = 1;
  totalPages = 1;
  firstThreeElements: any[] = [];

  ngOnInit(): void {
    this.loader.show();
    this.spotlightService
      .getSpotlightData()
      .pipe(finalize(() => this.loader.hide()))
      .subscribe((data: any) => {
        this.fullData = data;

        const sortedFull = [...this.fullData].sort((a, b) => {
          const ta = this.parseItemDate(a)?.getTime() ?? 0;
          const tb = this.parseItemDate(b)?.getTime() ?? 0;
          return tb - ta;
        });
        this.firstThreeElements = sortedFull.slice(0, 3);
        this.applyFilters();
      });
  }

  onFilterNews(category: string) {
    this.activeFilter = category;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearchChange() {
    this.currentPage = 1;
    this.applyFilters();
  }

  onDateFromChange(value: string | null) {
    this.dateFrom = value;
    this.currentPage = 1;
    this.applyFilters();
  }

  onDateToChange(value: string | null) {
    this.dateTo = value;
    this.currentPage = 1;
    this.applyFilters();
  }

  clearDateFilters() {
    this.dateFrom = null;
    this.dateTo = null;
    this.currentPage = 1;
    this.applyFilters();
  }

  private parseItemDate(item: any): Date | null {
    const keys = ['date', 'publishedAt', 'timestamp', 'createdAt'];
    for (const k of keys) {
      const v = item?.[k];
      if (!v) continue;
      const d = new Date(v);
      if (!isNaN(d.getTime())) return d;
    }
    return null;
  }

  private applyFilters() {
    if (this.activeFilter === 'all') {
      this.filteredData = [...this.fullData];
    } else {
      this.filteredData = this.fullData.filter(
        (news) =>
          news.category.toLowerCase() === this.activeFilter.toLowerCase()
      );
    }

    const q = this.searchText?.trim().toLowerCase();
    if (q) {
      this.filteredData = this.filteredData.filter((item) => {
        const title = (item.title || '').toString().toLowerCase();
        const category = (item.category || '').toString().toLowerCase();
        const body = (item.description || item.summary || item.body || '')
          .toString()
          .toLowerCase();
        return title.includes(q) || category.includes(q) || body.includes(q);
      });
    }

    const from = this.dateFrom ? new Date(this.dateFrom) : null;
    const to = this.dateTo ? new Date(this.dateTo) : null;
    if (from || to) {
      this.filteredData = this.filteredData.filter((item) => {
        const d = this.parseItemDate(item);
        if (!d) return false;
        if (from && d < from) return false;
        if (to) {
          const toEnd = new Date(to);
          toEnd.setHours(23, 59, 59, 999); // include full end day
          if (d > toEnd) return false;
        }
        return true;
      });
    }

    // sort most recent first
    this.filteredData.sort((a, b) => {
      const ta = this.parseItemDate(a)?.getTime() ?? 0;
      const tb = this.parseItemDate(b)?.getTime() ?? 0;
      return tb - ta;
    });
    // pagination calculations

    this.totalPages = Math.max(
      1,
      Math.ceil(this.filteredData.length / this.pageSize)
    );
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.updatePagedData();
  }

  private updatePagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedData = this.filteredData.slice(start, start + this.pageSize);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedData();
    }
  }

  goToPage(page: number) {
    const p = Math.min(Math.max(1, page), this.totalPages);
    if (p !== this.currentPage) {
      this.currentPage = p;
      this.updatePagedData();
    }
  }

  onOpenDetails(item: any) {
    this.router.navigate(['spotlight/details']);
    this.spotlightService.setSelectedSpotlight(item);
  }

  onEnableAddNew() {
    this.spotlightService.open();
  }
  getDirectImageUrl(url: string): SafeResourceUrl {
    const match = url.match(/\/d\/(.*?)\//);
    const fileId = match ? match[1] : '';
    const directUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(directUrl);
  }
}
