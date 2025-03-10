import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMarcarPreDefesaComponent } from './detalhe-marcar-pre-defesa.component';

describe('DetalheMarcarPreDefesaComponent', () => {
  let component: DetalheMarcarPreDefesaComponent;
  let fixture: ComponentFixture<DetalheMarcarPreDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheMarcarPreDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheMarcarPreDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
