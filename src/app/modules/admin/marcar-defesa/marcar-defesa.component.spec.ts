import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcarDefesaComponent } from './marcar-defesa.component';

describe('MarcarDefesaComponent', () => {
  let component: MarcarDefesaComponent;
  let fixture: ComponentFixture<MarcarDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcarDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcarDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
