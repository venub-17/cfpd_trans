import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQuote } from './request-quote';

describe('RequestQuote', () => {
  let component: RequestQuote;
  let fixture: ComponentFixture<RequestQuote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestQuote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestQuote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
