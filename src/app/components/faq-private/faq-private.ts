import { Component, OnInit } from '@angular/core';
import { FAQService } from '../../shared/services/faq.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';
import { AddFAQComponent } from './addFAQ.component';
import { AuthService } from '../../shared/services/auth.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-faq-private',
  imports: [CommonModule, AddFAQComponent],
  templateUrl: './faq-private.html',
  styleUrls: ['./faq-private.scss'],
})
export class FaqPrivate implements OnInit {
  constructor(
    private readonly faqService: FAQService,
    private readonly loaderService: LoaderService,
    public readonly authService: AuthService,
    private readonly modal: ModalService
  ) {}

  faqData: any[] = [];
  groupedFAQs: Record<string, any[]> = {};
  categories: string[] = [];
  activeGroup: string | null = null;
  openFaqKeys = new Set<string>(); // Track open FAQs
  selectedFAQ: any = null;

  ngOnInit() {
    this.onLoadFaqData();
  }

  onLoadFaqData() {
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
  onEventAdded() {
    this.onLoadFaqData();
  }
  isFaqOpen(group: string, index: number): boolean {
    return this.openFaqKeys.has(`${group}-${index}`); // Check if the FAQ is open
  }
  openAddFaqModal() {
    // Logic to open the modal for adding a new FAQ
    this.faqService.changeAddFAQModalStatus(true);
  }
  onUpdateSpotlight(faq: any) {
    this.selectedFAQ = { ...faq }; // Pass a copy of the selected FAQ
    this.faqService.changeAddFAQModalStatus(true);
    // You can implement logic to pass the selected FAQ data to the modal for editing
  }
  onDeleteSpotlight(faq: any) {
    this.loaderService.show();
    this.faqService
      .deleteFAQ(faq.id)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (res) => {
          this.onLoadFaqData();
          this.modal.setResContent('Success', 'FAQ Deleted Successfully');
        },
        error: (err) => {
          this.modal.setResContent('Error', 'Failed to delete FAQ');
        },
      });
  }
}
