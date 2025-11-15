import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { SpotlightService } from '../../shared/services/spotlight.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ModalService } from '../../shared/services/modal.service';

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
              Add New FAQ
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
                    required
                    [(ngModel)]="addNewForm.title"
                    (ngModelChange)="updateSlug()"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter Title"
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
                  [(ngModel)]="addNewForm.summary"
                  maxlength="300"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter a short summary"
                />
              </div>
            </form>
          </div>

          <!-- sticky footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="border px-4 py-2 rounded-lg hover:text-primary-600 hover:border-primary-600"
              (click)="closeAddNew()"
            >
              Close
            </button>
            <button
              type="button"
              class=" bg-primary-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-700 focus:outline-none"
              (click)="submitAddNew()"
            >
              Add
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
        max-width: 900px;
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

      input[type='file']::file-selector-button {
        background-color: rgb(2, 132, 199); /* Example background color */
        color: white; /* Example text color */
        border: none; /* Remove default border */
        padding: 10px 20px; /* Add padding */
        border-radius: 5px; /* Rounded corners */
        cursor: pointer; /* Indicate it's clickable */
        font-size: 16px; /* Adjust font size */
      }

      input[type='file']::file-selector-button:hover {
        background-color: #0369a1; /* Darker background on hover */
      }
    `,
  ],
})
export class AddFAQComponent implements OnInit {
  isOpen$: Observable<boolean>;
  addNewForm: {
    title: string;
    category: string;
    date: string; // ISO or date string
    summary: string;
    body: string;
    thumbnail?: string;
    hero?: string;
    attachment?: string; // when using URL
    tags?: string; // comma separated in form, parsed on submit
    visibility: 'public' | 'portal_only';
    share_enabled: boolean;
    slug: string;
    status: 'draft' | 'published' | 'archived';
    createdBy?: string;
    updatedBy?: string;
  } = {
    title: '',
    category: '',
    date: '',
    summary: '',
    body: '',
    thumbnail: '',
    hero: '',
    attachment: '',
    tags: '',
    visibility: 'public',
    share_enabled: false,
    slug: '',
    status: 'draft',
    createdBy: '',
    updatedBy: '',
  };
  // attachment uploader state
  useFileUpload = false;
  selectedFile?: File | null = null;
  selectedFileName = '';
  selectedFileSize = 0;
  selectedFileError = '';

  formErrors: string | null = null;
  constructor(
    private spotlightService: SpotlightService,
    private loader: LoaderService,
    private readonly modal: ModalService
  ) {
    this.isOpen$ = this.spotlightService.isOpen$;
  }
  ngOnInit(): void {}

  onEnableAddNew() {
    this.formErrors = null;
  }

  closeAddNew() {
    this.spotlightService.close();
    this.resetAddNewForm();
  }

  private resetAddNewForm() {
    this.addNewForm = {
      title: '',
      category: '',
      date: '',
      summary: '',
      body: '',
      thumbnail: '',
      hero: '',
      attachment: '',
      tags: '',
      visibility: 'public',
      share_enabled: false,
      slug: '',
      status: 'draft',
      createdBy: '',
      updatedBy: '',
    };
    this.useFileUpload = false;
    this.clearSelectedFile();
    this.formErrors = null;
  }

  updateSlug() {
    if (!this.addNewForm.slug || this.addNewForm.slug.trim() === '') {
      // simple slugify: lowercase, replace spaces with -, remove non-alnum/- chars
      const s = (this.addNewForm.title || '')
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '');
      this.addNewForm.slug = s;
    }
  }

  private generateSystemId(): string {
    const rnd = Math.floor(Math.random() * 0xfffff).toString(36);
    return `sys-${Date.now().toString(36)}-${rnd}`;
  }

  onFileSelected(event: Event) {
    this.selectedFileError = '';
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      this.clearSelectedFile();
      return;
    }
    const file = input.files[0];
    // Basic validation: accept only PDFs (as requested)
    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      this.selectedFileError = 'Only PDF files are accepted.';
      this.clearSelectedFile();
      return;
    }
    // optional: limit size (e.g., 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      this.selectedFileError = 'File is too large (max 10MB).';
      this.clearSelectedFile();
      return;
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
    this.selectedFileSize = file.size;
  }

  clearSelectedFile() {
    this.selectedFile = null;
    this.selectedFileName = '';
    this.selectedFileSize = 0;
    this.selectedFileError = '';
    // clear file input element if needed — easiest approach is to let Angular re-render; not doing DOM ops here
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reader.abort();
        reject(new Error('Failed to read file.'));
      };
      reader.onload = () => {
        const result = reader.result as string;
        // result is like "data:application/pdf;base64,JVBERi0x..."
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }

  async submitAddNew(): Promise<void> {
    this.formErrors = null;
    if (!this.addNewForm.title?.trim() || !this.addNewForm.category?.trim()) {
      this.formErrors = 'Title and category are required.';
      return;
    }

    // if using upload, ensure a file is selected
    if (this.useFileUpload && !this.selectedFile) {
      this.formErrors = 'Please select a file to upload (PDF).';
      return;
    }

    // ensure slug exists
    if (!this.addNewForm.slug) {
      this.updateSlug();
    }

    const nowIso = new Date().toISOString();

    // prepare attachment: either external URL string or embedded file object (base64)
    let attachmentPayload: any = null;
    if (this.useFileUpload && this.selectedFile) {
      try {
        const dataUrl = await this.readFileAsBase64(this.selectedFile);
        attachmentPayload = {
          filename: this.selectedFile.name,
          mimeType: this.selectedFile.type || 'application/pdf',
          size: this.selectedFile.size,
          dataUrl, // caller/service can upload or persist as needed
        };
      } catch (err) {
        this.formErrors = 'Failed to process selected file.';
        return;
      }
    } else if (!this.useFileUpload && this.addNewForm.attachment) {
      // external link
      attachmentPayload = this.addNewForm.attachment.trim();
    }
    this.loader.show();

    const payload = {
      // id: this.generateSystemId(),
      title: this.addNewForm.title.trim(),
      category: this.addNewForm.category,
      date: this.addNewForm.date
        ? new Date(this.addNewForm.date).toISOString()
        : nowIso,
      summary: this.addNewForm.summary?.trim() || '',
      body: this.addNewForm.body?.trim() || '',
      thumbnail: this.addNewForm.thumbnail || null,
      hero: this.addNewForm.hero || null,
      attachment: attachmentPayload, // either URL string or { filename, mimeType, size, dataUrl }
      tags: (this.addNewForm.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      visibility: this.addNewForm.visibility,
      share_enabled:
        this.addNewForm.visibility === 'public'
          ? !!this.addNewForm.share_enabled
          : false,
      slug: this.addNewForm.slug,
      status: this.addNewForm.status,
      createdBy: this.addNewForm.createdBy || 'system',
      updatedBy: this.addNewForm.updatedBy || 'system',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    this.spotlightService
      .postSpotlightData(payload)
      .pipe(finalize(() => this.loader.hide()))
      .subscribe({
        next: (res) => {
          // const message = res?.message ?? 'Password reset link sent to email';
          // this.modal.setResContent('Success', message);
        },
        error: (err) => {
          const message =
            err?.error?.error ?? err?.message ?? 'An error occurred';
          this.modal.setResContent('Error', message);
        },
      });

    this.closeAddNew();
  }
}
