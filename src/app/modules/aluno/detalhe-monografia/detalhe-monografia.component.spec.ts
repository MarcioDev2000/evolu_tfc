import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMonografiaComponent } from './detalhe-monografia.component';

describe('DetalheMonografiaComponent', () => {
  let component: DetalheMonografiaComponent;
  let fixture: ComponentFixture<DetalheMonografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheMonografiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheMonografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
