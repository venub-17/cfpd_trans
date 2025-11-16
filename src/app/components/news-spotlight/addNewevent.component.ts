import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { SpotlightService } from '../../shared/services/spotlight.service';
import { LoaderService } from '../../shared/services/loader.service';
import { ModalService } from '../../shared/services/modal.service';

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
                <div id="thumbnail_url-field" class="form-group">
                  <label
                    for="thumbnail_url"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Thumbnail URL
                  </label>
                  <input
                    type="url"
                    id="thumbnail_url"
                    name="thumbnail_url"
                    [(ngModel)]="addNewForm.thumbnail_url"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="https://..."
                  />
                </div>

                <div id="hero_image_url-field" class="form-group">
                  <label
                    for="hero_image_url"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Hero Image URL
                  </label>
                  <input
                    type="url"
                    id="hero_image_url"
                    name="hero_image_url"
                    [(ngModel)]="addNewForm.hero_image_url"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <!-- attachment_url: can be URL or uploaded file -->
              <div id="attachment_url-field" class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Attachment (PDF or external link)</label
                >

                <div class="flex items-center gap-4 mb-2">
                  <label class="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="attachment_urlMode"
                      [checked]="!useFileUpload"
                      (change)="useFileUpload = false"
                    />
                    <span class="text-sm">External URL</span>
                  </label>
                  <label class="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="attachment_urlMode"
                      [checked]="useFileUpload"
                      (change)="useFileUpload = true"
                    />
                    <span class="text-sm">Upload File</span>
                  </label>
                </div>

                <div *ngIf="!useFileUpload">
                  <input
                    type="url"
                    id="attachment_url"
                    name="attachment_url"
                    [(ngModel)]="addNewForm.attachment_url"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="https://... (or /assets/file.pdf)"
                  />
                </div>

                <div *ngIf="useFileUpload" class="flex flex-col gap-2">
                  <input
                    type="file"
                    id="attachment_urlFile"
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

              <div id="search_tags-field" class="form-group">
                <label
                  for="search_tags"
                  class="block text-sm font-medium text-gray-700 mb-2"
                  >Search search_tags
                </label>
                <input
                  type="text"
                  id="search_tags"
                  name="search_tags"
                  [(ngModel)]="addNewForm.search_tags"
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
                    for="share_enabled"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Share Enabled</label
                  >
                  <input
                    id="share_enabled"
                    name="share_enabled"
                    type="checkbox"
                    [(ngModel)]="addNewForm.share_enabled"
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
export class AddNeweventComponent implements OnInit, OnChanges {
  isOpen$: Observable<boolean>;
  @Input() item: any | null = null;
  addNewForm: {
    title: string;
    category: string;
    date: string; // ISO or date string
    summary: string;
    body: string;
    thumbnail_url?: string;
    hero_image_url?: string;
    attachment_url?: string; // when using URL
    search_tags?: string; // comma separated in form, parsed on submit
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
    thumbnail_url: '',
    hero_image_url: '',
    attachment_url: '',
    search_tags: '',
    visibility: 'public',
    share_enabled: false,
    slug: '',
    status: 'draft',
    createdBy: '',
    updatedBy: '',
  };
  // attachment_url uploader state
  useFileUpload = false;
  selectedFile?: File | null = null;
  selectedFileName = '';
  selectedFileSize = 0;
  selectedFileError = '';
  isUpdateMode = false;
  @Output() eventAdded = new EventEmitter<void>();
  formErrors: string | null = null;
  constructor(
    private spotlightService: SpotlightService,
    private loader: LoaderService,
    private readonly modal: ModalService
  ) {
    this.isOpen$ = this.spotlightService.isOpen$;
  }
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if ('item' in changes) {
      if (this.item) {
        this.isUpdateMode = true;
        console.log('Editing existing item:', this.item);
        // normalize incoming API shape into the form model
        this.addNewForm = {
          title: this.item.title ?? '',
          category: this.normalizeCategory(this.item.category),
          // input[type=date] expects YYYY-MM-DD — extract from ISO if present
          date: this.item.date
            ? String(this.item.date).split('T')[0]
            : this.item.created_at
            ? String(this.item.created_at).split('T')[0]
            : '',
          summary: this.item.summary ?? '',
          body: this.item.body ?? '',
          thumbnail_url: this.item.thumbnail_url ?? '',
          hero_image_url: this.item.hero_image_url ?? '',
          // attachment_url can be null, string, or object; for edit keep URL string if provided
          attachment_url:
            typeof this.item.attachment_url === 'string'
              ? this.item.attachment_url
              : '',
          // server may send array or comma string or null
          search_tags:
            Array.isArray(this.item.search_tags) && this.item.search_tags.length
              ? this.item.search_tags.join(',')
              : this.item.search_tags ?? '',
          visibility: this.item.visibility ?? 'public',
          share_enabled:
            this.item.share_enabled === 1 ||
            this.item.share_enabled === true ||
            this.item.share_enabled === '1',
          slug: this.item.slug ?? '',
          status: this.item.status ?? 'draft',
          createdBy: this.item.created_by ?? '',
          updatedBy: this.item.updated_by ?? '',
        };

        // If the existing item has a file-like attachment, prefer file-upload mode
        if (
          this.item.attachment_url &&
          typeof this.item.attachment_url === 'object'
        ) {
          this.useFileUpload = true;
          this.selectedFileName = this.item.attachment_url.filename || '';
        } else {
          this.useFileUpload = false;
          this.clearSelectedFile();
        }
      } else {
        this.resetAddNewForm();
      }
    }
  }

  private normalizeCategory(cat: any): string {
    if (cat == null) return '';
    const s = String(cat).trim().toLowerCase();
    if (s.includes('announce')) return 'announcement';
    if (s.includes('safet')) return 'safety';
    if (s.includes('event')) return 'event';
    if (s.includes('commun')) return 'community';
    // fallback to raw lowercase value
    return s;
  }

  private categoryForApi(cat: string): string {
    if (!cat) return cat;
    switch (cat.toLowerCase()) {
      case 'event':
        return 'Events'; // match UI/display expectations (plural)
      case 'announcement':
        return 'Announcement';
      case 'safety':
        return 'Safety';
      case 'community':
        return 'Community';
      default:
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
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
    // prepare attachment_url: either external URL string or embedded file object (base64)
    let attachment_urlPayload: any = null;
    if (this.useFileUpload && this.selectedFile) {
      try {
        const dataUrl = await this.readFileAsBase64(this.selectedFile);
        attachment_urlPayload = {
          filename: this.selectedFile.name,
          mimeType: this.selectedFile.type || 'application/pdf',
          size: this.selectedFile.size,
          dataUrl, // caller/service can upload or persist as needed
        };
      } catch (err) {
        this.formErrors = 'Failed to process selected file.';
        return;
      }
    } else if (!this.useFileUpload && this.addNewForm.attachment_url) {
      // external link
      attachment_urlPayload = this.addNewForm.attachment_url.trim();
    }
    this.loader.show();
    if (this.isUpdateMode) {
      const id = this.item?.id;
      const payload = {
        title: this.addNewForm.title.trim(),
        category: this.categoryForApi(this.addNewForm.category),
        date: this.addNewForm.date
          ? new Date(this.addNewForm.date).toISOString()
          : new Date().toISOString(),
        summary: this.addNewForm.summary?.trim() || '',
        body: this.addNewForm.body?.trim() || '',
        thumbnail_url: this.addNewForm.thumbnail_url || null,
        hero_image_url: this.addNewForm.hero_image_url || null,
        attachment_url: attachment_urlPayload,
        visibility: this.addNewForm.visibility,
        share_enabled:
          this.addNewForm.visibility === 'public'
            ? !!this.addNewForm.share_enabled
            : false,
        slug: this.addNewForm.slug,
        status: this.addNewForm.status,
      };

      this.spotlightService
        .onUpdateSpotlight(id, payload)
        .pipe(finalize(() => this.loader.hide()))
        .subscribe({
          next: (res: any) => {
            const message = res?.message ?? 'Event added successfully.';
            this.eventAdded.emit(); // Emit event to parent
            this.modal.setResContent('Success', message);
          },
          error: (err) => {
            const message =
              err?.error?.error ?? err?.message ?? 'An error occurred';
            this.modal.setResContent('Error', message);
          },
        });
    } else {
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

      const payload = {
        title: this.addNewForm.title.trim(),
        category: this.categoryForApi(this.addNewForm.category),
        date: this.addNewForm.date
          ? new Date(this.addNewForm.date).toISOString()
          : new Date().toISOString(),
        summary: this.addNewForm.summary?.trim() || '',
        body: this.addNewForm.body?.trim() || '',
        thumbnail_url: this.addNewForm.thumbnail_url || null,
        hero_image_url: this.addNewForm.hero_image_url || null,
        attachment_url: attachment_urlPayload,
        visibility: this.addNewForm.visibility,
        share_enabled:
          this.addNewForm.visibility === 'public'
            ? !!this.addNewForm.share_enabled
            : false,
        slug: this.addNewForm.slug,
        status: this.addNewForm.status,
      };

      this.spotlightService
        .postSpotlightData(payload)
        .pipe(finalize(() => this.loader.hide()))
        .subscribe({
          next: (res: any) => {
            const message = res?.message ?? 'Event added successfully.';
            this.eventAdded.emit(); // Emit event to parent
            this.modal.setResContent('Success', message);
          },
          error: (err) => {
            const message =
              err?.error?.error ?? err?.message ?? 'An error occurred';
            this.modal.setResContent('Error', message);
          },
        });
    }
    this.closeAddNew();
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
      thumbnail_url: '',
      hero_image_url: '',
      attachment_url: '',
      search_tags: '',
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
}
