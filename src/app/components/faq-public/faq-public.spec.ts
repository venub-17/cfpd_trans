import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPublic } from './faq-public';

describe('FaqPublic', () => {
  let component: FaqPublic;
  let fixture: ComponentFixture<FaqPublic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqPublic]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPublic);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
