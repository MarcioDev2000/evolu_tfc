import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestaoAlunosComponent } from './gestao-alunos.component';

describe('GestaoAlunosComponent', () => {
  let component: GestaoAlunosComponent;
  let fixture: ComponentFixture<GestaoAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestaoAlunosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestaoAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
