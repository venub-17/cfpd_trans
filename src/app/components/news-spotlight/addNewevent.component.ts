import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { SpotlightService } from '../../shared/services/spotlight.service';

@Component({
  selector: 'app-add-new-event',
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
              Add New Spotlight
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
                    >Title</label
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

              <div class="grid grid-cols-2 gap-3">
                <div id="date-field" class="form-group">
                  <label
                    for="date"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    [(ngModel)]="addNewForm.date"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>

                <div id="category-field" class="form-group">
                  <label
                    for="category"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Category</label
                  >
                  <select
                    id="category"
                    name="category"
                    required
                    [(ngModel)]="addNewForm.category"
                    class="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  >
                    <option value="">Select a Category</option>
                    <option value="announcement">Announcement</option>
                    <option value="safety">Safety</option>
                    <option value="event">Event</option>
                    <option value="community">Community</option>
                  </select>
                </div>
              </div>

              <div id="summary-field" class="form-group">
                <label
                  for="summary"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Summary</label
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

              <div id="body-field" class="form-group">
                <label
                  for="body"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Body</label
                >
                <textarea
                  id="body"
                  name="body"
                  rows="4"
                  [(ngModel)]="addNewForm.body"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 resize-none"
                  placeholder="Full content / body..."
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div id="thumbnail-field" class="form-group">
                  <label
                    for="thumbnailUrl"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Thumbnail URL
                  </label>
                  <input
                    type="url"
                    id="thumbnailUrl"
                    name="thumbnailUrl"
                    [(ngModel)]="addNewForm.thumbnailUrl"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="https://..."
                  />
                </div>

                <div id="hero-field" class="form-group">
                  <label
                    for="heroImageUrl"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Hero Image URL
                  </label>
                  <input
                    type="url"
                    id="heroImageUrl"
                    name="heroImageUrl"
                    [(ngModel)]="addNewForm.heroImageUrl"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <!-- Attachment: can be URL or uploaded file -->
              <div id="attachment-field" class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Attachment (PDF or external link)</label
                >

                <div class="flex items-center gap-4 mb-2">
                  <label class="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="attachmentMode"
                      [checked]="!useFileUpload"
                      (change)="useFileUpload = false"
                    />
                    <span class="text-sm">External URL</span>
                  </label>
                  <label class="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="attachmentMode"
                      [checked]="useFileUpload"
                      (change)="useFileUpload = true"
                    />
                    <span class="text-sm">Upload File</span>
                  </label>
                </div>

                <div *ngIf="!useFileUpload">
                  <input
                    type="url"
                    id="attachment"
                    name="attachment"
                    [(ngModel)]="addNewForm.attachment"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="https://... (or /assets/file.pdf)"
                  />
                </div>

                <div *ngIf="useFileUpload" class="flex flex-col gap-2">
                  <input
                    type="file"
                    id="attachmentFile"
                    (change)="onFileSelected($event)"
                    accept=".pdf,application/pdf"
                    class="w-full"
                  />
                  <div
                    *ngIf="selectedFileName"
                    class="text-sm text-neutral-600"
                  >
                    Selected: {{ selectedFileName }} ({{
                      selectedFileSize | number
                    }}
                    bytes)
                    <button
                      type="button"
                      class="ml-3 text-sm underline"
                      (click)="clearSelectedFile()"
                    >
                      Remove
                    </button>
                  </div>
                  <div *ngIf="selectedFileError" class="text-red-600 text-sm">
                    {{ selectedFileError }}
                  </div>
                </div>
              </div>

              <div id="tags-field" class="form-group">
                <label
                  for="tags"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Search Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  [(ngModel)]="addNewForm.tags"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="safety,training,holiday"
                />
              </div>

              <div class="grid grid-cols-2 gap-3">
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
                    <option value="public">Public</option>
                    <option value="portal_only">Portal only</option>
                  </select>
                </div>

                <div
                  id="share-field"
                  class="form-group flex items-center gap-2"
                >
                  <label
                    for="shareEnabled"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Share Enabled</label
                  >
                  <input
                    id="shareEnabled"
                    name="shareEnabled"
                    type="checkbox"
                    [(ngModel)]="addNewForm.shareEnabled"
                    [disabled]="addNewForm.visibility !== 'public'"
                    class="h-5 w-5"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div id="slug-field" class="form-group">
                  <label
                    for="slug"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    [(ngModel)]="addNewForm.slug"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>

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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <!-- hidden submit so Enter still works -->
              <button
                type="submit"
                style="display:none"
                aria-hidden="true"
              ></button>

              <div *ngIf="formErrors" class="text-red-600 mt-2">
                {{ formErrors }}
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
export class AddNeweventComponent implements OnInit {
  isOpen$: Observable<boolean>;
  addNewForm: {
    title: string;
    category: string;
    date: string; // ISO or date string
    summary: string;
    body: string;
    thumbnailUrl?: string;
    heroImageUrl?: string;
    attachment?: string; // when using URL
    tags?: string; // comma separated in form, parsed on submit
    visibility: 'public' | 'portal_only';
    shareEnabled: boolean;
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
    thumbnailUrl: '',
    heroImageUrl: '',
    attachment: '',
    tags: '',
    visibility: 'public',
    shareEnabled: false,
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
  constructor(private spotlightService: SpotlightService) {
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
      thumbnailUrl: '',
      heroImageUrl: '',
      attachment: '',
      tags: '',
      visibility: 'public',
      shareEnabled: false,
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

    const payload = {
      id: this.generateSystemId(),
      title: this.addNewForm.title.trim(),
      category: this.addNewForm.category,
      date: this.addNewForm.date
        ? new Date(this.addNewForm.date).toISOString()
        : nowIso,
      summary: this.addNewForm.summary?.trim() || '',
      body: this.addNewForm.body?.trim() || '',
      thumbnailUrl: this.addNewForm.thumbnailUrl || null,
      heroImageUrl: this.addNewForm.heroImageUrl || null,
      attachment: attachmentPayload, // either URL string or { filename, mimeType, size, dataUrl }
      tags: (this.addNewForm.tags || '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      visibility: this.addNewForm.visibility,
      shareEnabled:
        this.addNewForm.visibility === 'public'
          ? !!this.addNewForm.shareEnabled
          : false,
      slug: this.addNewForm.slug,
      status: this.addNewForm.status,
      createdBy: this.addNewForm.createdBy || 'system',
      updatedBy: this.addNewForm.updatedBy || 'system',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Replace this with real upload/persisting logic.
    // If you want server-side upload, send `selectedFile` via FormData to an upload endpoint instead of embedding base64.
    console.log('New Spotlight Item payload:', payload);

    this.closeAddNew();
  }
}
