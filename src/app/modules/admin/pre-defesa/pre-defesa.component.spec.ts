import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDefesaComponent } from './pre-defesa.component';

describe('PreDefesaComponent', () => {
  let component: PreDefesaComponent;
  let fixture: ComponentFixture<PreDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
