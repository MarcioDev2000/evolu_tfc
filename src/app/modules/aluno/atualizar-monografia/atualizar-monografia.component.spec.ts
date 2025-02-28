import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarMonografiaComponent } from './atualizar-monografia.component';

describe('AtualizarMonografiaComponent', () => {
  let component: AtualizarMonografiaComponent;
  let fixture: ComponentFixture<AtualizarMonografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarMonografiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizarMonografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
