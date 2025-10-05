import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forgotpwd } from './forgotpwd';

describe('Forgotpwd', () => {
  let component: Forgotpwd;
  let fixture: ComponentFixture<Forgotpwd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forgotpwd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forgotpwd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
