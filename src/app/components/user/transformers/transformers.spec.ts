import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transformers } from './transformers';

describe('Transformers', () => {
  let component: Transformers;
  let fixture: ComponentFixture<Transformers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transformers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transformers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
