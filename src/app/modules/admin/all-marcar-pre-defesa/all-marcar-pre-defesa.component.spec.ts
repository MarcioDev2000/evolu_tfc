import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMarcarPreDefesaComponent } from './all-marcar-pre-defesa.component';

describe('AllMarcarPreDefesaComponent', () => {
  let component: AllMarcarPreDefesaComponent;
  let fixture: ComponentFixture<AllMarcarPreDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMarcarPreDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMarcarPreDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
