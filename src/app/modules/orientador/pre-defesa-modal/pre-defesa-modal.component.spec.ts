import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDefesaModalComponent } from './pre-defesa-modal.component';

describe('PreDefesaModalComponent', () => {
  let component: PreDefesaModalComponent;
  let fixture: ComponentFixture<PreDefesaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDefesaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreDefesaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
