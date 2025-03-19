import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMarcacaoDefesaComponent } from './detalhe-marcacao-defesa.component';

describe('DetalheMarcacaoDefesaComponent', () => {
  let component: DetalheMarcacaoDefesaComponent;
  let fixture: ComponentFixture<DetalheMarcacaoDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheMarcacaoDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheMarcacaoDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
