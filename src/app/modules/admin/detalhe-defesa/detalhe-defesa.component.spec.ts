import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDefesaComponent } from './detalhe-defesa.component';

describe('DetalheDefesaComponent', () => {
  let component: DetalheDefesaComponent;
  let fixture: ComponentFixture<DetalheDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
