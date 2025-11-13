import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPrivate } from './faq-private';

describe('FaqPrivate', () => {
  let component: FaqPrivate;
  let fixture: ComponentFixture<FaqPrivate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqPrivate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPrivate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
