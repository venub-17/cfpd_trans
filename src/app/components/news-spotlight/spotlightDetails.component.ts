import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SpotlightService } from '../../shared/services/spotlight.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-spotlight-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="spotlight_details_container p-4">
      <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <button
            (click)="onGoBack()"
            class="inline-flex items-center justify-center gap-2  text-sm font-medium hover:text-primary-600 h-10 px-4 py-2 mb-6 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            Back to Spotlight
          </button>
          <article
            class="bg-card rounded-lg overflow-hidden shadow-[var(--shadow-lg)]"
          >
            <div class="aspect-video overflow-hidden bg-muted">
              <img
                [src]="getDirectImageUrl(spotlightData.attachment_url)"
                alt="New Safety Protocols Implemented Across All Facilities"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-8 md:p-12">
              <div class="flex items-center justify-between gap-4 mb-4">
                <span
                  [ngClass]="{
                    'bg-blue-100 text-blue-700':
                      spotlightData.category === 'Announcement',
                    'bg-green-100 text-green-700':
                      spotlightData.category === 'Safety',
                    'bg-purple-100 text-purple-700':
                      spotlightData.category === 'Events',
                    'bg-orange-100 text-orange-700':
                      spotlightData.category === 'Community',
                    'bg-gray-100 text-gray-700': ![
                      'Announcement',
                      'Safety',
                      'Events',
                      'Community'
                    ].includes(spotlightData.category)
                  }"
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors mb-2"
                  >{{ spotlightData.category }}</span
                >
              </div>
              <div
                class="flex items-center gap-2 justify-between text-sm text-muted-foreground mb-6"
              >
                <div class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-4  "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  <time datetime="2025-01-15">{{
                    spotlightData.date | date : 'mediumDate'
                  }}</time>
                </div>

                <div class="flex gap-6 ">
                  <span class="group cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="size-4 text-[#b3d0f7] group-hover:text-primary-600 transition-transform duration-300"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </span>
                  <span class="group cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="size-4 text-red-400 group-hover:text-red-600 transition-transform duration-300"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold mb-8 text-foreground">
                {{ spotlightData.title }}
              </h1>
              <div class="prose prose-lg max-w-none">
                <p class="mb-4 text-foreground leading-relaxed">
                  {{ spotlightData.body }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class SpotlightDetailsComponent implements OnInit {
  spotlightData: any;
  constructor(
    private readonly location: Location,
    private readonly S: SpotlightService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.S.selectedSpotlight$.subscribe((data) => {
      console.log('Selected Spotlight Data:', data);
      this.spotlightData = data;
    });
  }

  onGoBack() {
    this.location.back();
  }
  getDirectImageUrl(url: string): SafeResourceUrl {
    const match = url.match(/\/d\/(.*?)\//);
    const fileId = match ? match[1] : '';
    const directUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(directUrl);
  }
}
