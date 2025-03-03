import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMonografiaComponent } from './ver-monografia.component';

describe('VerMonografiaComponent', () => {
  let component: VerMonografiaComponent;
  let fixture: ComponentFixture<VerMonografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerMonografiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerMonografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
