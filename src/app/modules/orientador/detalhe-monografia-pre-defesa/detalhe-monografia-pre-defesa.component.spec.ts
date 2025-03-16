import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMonografiaPreDefesaComponent } from './detalhe-monografia-pre-defesa.component';

describe('DetalheMonografiaPreDefesaComponent', () => {
  let component: DetalheMonografiaPreDefesaComponent;
  let fixture: ComponentFixture<DetalheMonografiaPreDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheMonografiaPreDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheMonografiaPreDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
