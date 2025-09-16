import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Transformer } from './transformer';

describe('Transformer', () => {
  let component: Transformer;
  let fixture: ComponentFixture<Transformer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Transformer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Transformer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
