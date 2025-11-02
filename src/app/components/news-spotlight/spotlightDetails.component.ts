import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { SpotlightService } from '../../shared/services/spotlight.service';

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
                src="{{ spotlightData.attachment_url }}"
                alt="New Safety Protocols Implemented Across All Facilities"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="p-8 md:p-12">
              <div class="flex items-center justify-between gap-4 mb-4">
                <span
                  [ngClass]="{
                    'bg-blue-100 text-blue-700':
                      spotlightData.category === 'announcement',
                    'bg-green-100 text-green-700':
                      spotlightData.category === 'safety',
                    'bg-purple-100 text-purple-700':
                      spotlightData.category === 'events',
                    'bg-orange-100 text-orange-700':
                      spotlightData.category === 'community',
                    'bg-gray-100 text-gray-700': ![
                      'announcement',
                      'safety',
                      'events',
                      'community'
                    ].includes(spotlightData.category)
                  }"
                  class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors mb-2"
                  >{{ spotlightData.category }}</span
                >
              </div>
              <div
                class="flex items-center gap-2 text-sm text-muted-foreground mb-6"
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <time datetime="2025-01-15">{{
                  spotlightData.date | date : 'mediumDate'
                }}</time>
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
    private readonly S: SpotlightService
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
}
