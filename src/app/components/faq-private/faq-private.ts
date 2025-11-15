import { Component, OnInit } from '@angular/core';
import { FAQService } from '../../shared/services/faq.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';
import { AddFAQComponent } from './addFAQ.component';

@Component({
  selector: 'app-faq-private',
  imports: [CommonModule, AddFAQComponent],
  templateUrl: './faq-private.html',
  styleUrls: ['./faq-private.scss'],
})
export class FaqPrivate implements OnInit {
  constructor(
    private readonly faqService: FAQService,
    private readonly loaderService: LoaderService
  ) {}

  faqData: any[] = [];
  groupedFAQs: Record<string, any[]> = {};
  categories: string[] = [];
  activeGroup: string | null = null;
  openFaqKeys = new Set<string>(); // Track open FAQs

  ngOnInit() {
    this.loaderService.show();
    this.faqService
      .getAdminFaqData()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(
        (data) => {
          this.faqData = Array.isArray(data) ? data : [];
          this.groupedFAQs = this.faqData.reduce((groups: any, faq: any) => {
            const category = faq?.category || 'Uncategorized';
            if (!groups[category]) groups[category] = [];
            groups[category].push(faq);
            return groups;
          }, {} as Record<string, any[]>);
          this.categories = Object.keys(this.groupedFAQs);
          this.activeGroup = this.categories.length ? this.categories[0] : null;
        },
        (err) => {
          this.faqData = [];
          this.groupedFAQs = {};
          this.categories = [];
          this.activeGroup = null;
        }
      );
  }

  selectGroup(category: string | null) {
    this.activeGroup = category;
    // No need to clear open FAQs
  }

  toggleFaq(group: string, index: number) {
    const faqKey = `${group}-${index}`;
    if (this.openFaqKeys.has(faqKey)) {
      this.openFaqKeys.delete(faqKey); // Close the FAQ if it's already open
    } else {
      this.openFaqKeys.add(faqKey); // Open the FAQ
    }
  }

  isFaqOpen(group: string, index: number): boolean {
    return this.openFaqKeys.has(`${group}-${index}`); // Check if the FAQ is open
  }
  openAddFaqModal() {
    // Logic to open the modal for adding a new FAQ
  }
}
