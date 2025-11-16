import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../../shared/services/loader.service';
import { ModalService } from '../../shared/services/modal.service';
import { FAQService } from '../../shared/services/faq.service';

@Component({
  selector: 'app-add-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay z-50" *ngIf="isOpen$ | async">
      <div class="modal-content ">
        <div
          class="add-new-modal"
          style="background:#fff;padding:0;border-radius:6px;overflow:hidden;"
        >
          <!-- sticky header -->
          <div class="modal-header">
            <h3
              style="margin:0;padding:1rem 1rem 0.5rem; font-size:1.25rem; font-weight:600;"
            >
              {{ item ? 'Edit FAQ' : 'Add New FAQ' }}
            </h3>
          </div>

          <!-- scrollable body -->
          <div
            id="form-container"
            class="modal-body bg-opacity-30 rounded-lg p-6"
          >
            <form
              id="contact-form"
              class="space-y-6"
              (ngSubmit)="submitAddNew()"
            >
              <div class="flex items-center gap-3 justify-between">
                <div id="title-field" class="form-group w-full">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Question</label
                  >
                  <input
                    type="text"
                    id="title"
                    name="title"
                    [(ngModel)]="addNewForm.question"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter Your Question"
                  />
                </div>
              </div>

              <div id="summary-field" class="form-group">
                <label
                  for="summary"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Answer</label
                >
                <input
                  type="text"
                  id="summary"
                  name="summary"
                  [(ngModel)]="addNewForm.answer"
                  maxlength="300"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter Your Answer"
                />
              </div>

              <!-- Category -->
              <div id="category-field" class="form-group">
                <label
                  for="category"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Category</label
                >
                <select
                  id="category"
                  name="category"
                  [(ngModel)]="addNewForm.category"
                  class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option *ngFor="let service of categories" [value]="service">
                    {{ service }}
                  </option>
                </select>
              </div>

              <!-- Visibility -->
              <div id="visibility-field" class="form-group">
                <label
                  for="visibility"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Visibility</label
                >
                <select
                  id="visibility"
                  name="visibility"
                  [(ngModel)]="addNewForm.visibility"
                  class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                >
                  <option value="">Select a Visibility</option>
                  <option value="public">Public</option>
                  <option value="internal">Internal</option>
                </select>
              </div>

              <!-- Status -->
              <div id="status-field" class="form-group">
                <label
                  for="status"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Status</label
                >
                <select
                  id="status"
                  name="status"
                  [(ngModel)]="addNewForm.status"
                  class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                >
                  <option value="">Select a Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </form>
          </div>

          <!-- sticky footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="border px-4 py-2 rounded-lg hover:text-primary-600 hover:border-primary-600"
              (click)="onCloseModal()"
            >
              Close
            </button>
            <button
              type="button"
              class=" bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:outline-none"
              (click)="submitAddNew()"
            >
              {{ item ? 'Update' : 'Add' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .modal-content {
        background-color: #fff;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow: hidden; /* children handle scrolling */
      }

      /* layout for modal internals: header / scrollable body / footer */
      .add-new-modal {
        display: flex;
        flex-direction: column;
        height: 80vh;
        max-height: 80vh;
        border-radius: 6px;
        overflow: hidden;
      }

      .modal-header {
        flex: 0 0 auto;
        background: #fff;
        border-bottom: 1px solid #eee;
        z-index: 2;
      }

      .modal-body {
        flex: 1 1 auto;
        overflow-y: auto;
        padding: 1rem;
        background: #fff;
      }

      .modal-footer {
        flex: 0 0 auto;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: #fff;
        z-index: 2;
      }

      .modal-footer button {
        min-width: 80px;
      }
    `,
  ],
})
export class AddFAQComponent implements OnInit, OnChanges {
  isOpen$: Observable<boolean>;
  addNewForm: {
    question?: string;
    answer?: string;
    category?: string;
    visibility?: string;
    status?: string;
    attachments?: File[];
  } = {
    question: '',
    answer: '',
    category: '',
    visibility: 'public',
    status: 'draft', // changed from 'active' to match select option
    attachments: [],
  };
  isUpdating: boolean = false;
  @Output() eventAdded = new EventEmitter<void>();
  @Input() categories: string[] = []; // fixed spelling to 'categories'
  @Input() item: any | null = null;
  constructor(
    private faqService: FAQService,
    private loader: LoaderService,
    private readonly modal: ModalService
  ) {
    this.isOpen$ = this.faqService.currentAddFAQModalStatus;
  }
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes detected:', this.item, this.categories);
    if (changes['item'] && this.item) {
      this.isUpdating = true;
      this.patchFormValues(this.item);
    }
  }
  patchFormValues(item: any): void {
    this.addNewForm = {
      question: item.question || '',
      answer: item.answer || '',
      category: item.category || 'Uncategorized',
      visibility: item.visibility || 'public',
      status: item.status || 'draft',
      attachments: item.attachments || [],
    };
  }
  resetForm(): void {
    this.addNewForm = {
      question: '',
      answer: '',
      category: '',
      visibility: 'public',
      status: 'draft',
      attachments: [],
    };
  }
  async submitAddNew(): Promise<void> {
    if (this.isUpdating && this.item) {
      // Update existing FAQ
      this.loader.show();

      this.faqService
        .updateFAQ(this.item.id, this.addNewForm)
        .pipe(finalize(() => this.loader.hide()))
        .subscribe({
          next: () => {
            this.eventAdded.emit();
            this.resetForm();
            this.faqService.changeAddFAQModalStatus(false);
            this.isUpdating = false;
          },
          error: (err) => {
            console.error('Error updating FAQ:', err);
          },
        });
    } else {
      // Add new FAQ
      this.loader.show();
      this.faqService
        .createFAQ(this.addNewForm)
        .pipe(finalize(() => this.loader.hide()))
        .subscribe({
          next: () => {
            this.eventAdded.emit();
            this.resetForm();
            this.faqService.changeAddFAQModalStatus(false);
          },
          error: (err) => {
            console.error('Error creating FAQ:', err);
          },
        });
    }
  }
  onCloseModal(): void {
    this.resetForm();
    this.faqService.changeAddFAQModalStatus(false);
  }
}
