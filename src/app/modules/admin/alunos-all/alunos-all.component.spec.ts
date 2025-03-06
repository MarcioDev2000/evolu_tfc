import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunosAllComponent } from './alunos-all.component';

describe('AlunosAllComponent', () => {
  let component: AlunosAllComponent;
  let fixture: ComponentFixture<AlunosAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlunosAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlunosAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
