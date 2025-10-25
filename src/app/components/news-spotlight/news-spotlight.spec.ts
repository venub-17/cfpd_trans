import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSpotlight } from './news-spotlight';

describe('NewsSpotlight', () => {
  let component: NewsSpotlight;
  let fixture: ComponentFixture<NewsSpotlight>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsSpotlight]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsSpotlight);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
