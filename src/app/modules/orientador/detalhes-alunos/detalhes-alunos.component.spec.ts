import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAlunosComponent } from './detalhes-alunos.component';

describe('DetalhesAlunosComponent', () => {
  let component: DetalhesAlunosComponent;
  let fixture: ComponentFixture<DetalhesAlunosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesAlunosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesAlunosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
