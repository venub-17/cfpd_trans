import { Component, OnInit } from '@angular/core';
import { FAQService } from '../../shared/services/faq.service';
import { finalize } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-public',
  imports: [CommonModule],
  templateUrl: './faq-public.html',
  styleUrl: './faq-public.scss',
})
export class FaqPublic implements OnInit {
  FAQs: any[] = [];
  activeIndices: Set<number> = new Set();
  constructor(
    private readonly faqService: FAQService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.show();
    this.faqService
      .getFaqData()
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe(
        (data) => {
          console.log('FAQ data:', data);
          this.FAQs = Array.isArray(data) ? data : [];
        },
        (err) => {
          console.error('Error fetching FAQ data:', err);
        }
      );
  }
  toggleFaq(index: number) {
    if (this.activeIndices.has(index)) {
      this.activeIndices.delete(index);
    } else {
      this.activeIndices.add(index);
    }
  }
}
