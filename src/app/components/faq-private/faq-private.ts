import { Component, OnInit } from '@angular/core';
import { FAQService } from '../../shared/services/faq.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-faq-private',
  imports: [CommonModule],

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
  openFaqKeys = new Set<string>();
  openFaq: { group: string | null; index: number | null } = {
    group: null,
    index: null,
  };
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
    this.faqService.getFaqData().subscribe((data) => {
      console.log('Admin FAQ data:', data);
    });
  }

  selectGroup(category: string | null) {
    this.activeGroup = category;
    this.openFaqKeys.clear();
    this.openFaq = { group: null, index: null };
  }

  toggleFaq(group: string, index: number) {
    if (this.openFaq.group === group && this.openFaq.index === index) {
      this.openFaq = { group: null, index: null };
    } else {
      this.openFaq = { group, index };
    }
  }

  isFaqOpen(group: string, index: number): boolean {
    return this.openFaq.group === group && this.openFaq.index === index;
  }
}
