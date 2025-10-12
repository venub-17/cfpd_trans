import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resetpwd } from './resetpwd';

describe('Resetpwd', () => {
  let component: Resetpwd;
  let fixture: ComponentFixture<Resetpwd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Resetpwd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Resetpwd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
