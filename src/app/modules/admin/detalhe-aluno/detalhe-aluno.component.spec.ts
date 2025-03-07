import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheAlunoComponent } from './detalhe-aluno.component';

describe('DetalheAlunoComponent', () => {
  let component: DetalheAlunoComponent;
  let fixture: ComponentFixture<DetalheAlunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheAlunoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
