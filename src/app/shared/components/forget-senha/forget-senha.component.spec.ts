import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetSenhaComponent } from './forget-senha.component';

describe('ForgetSenhaComponent', () => {
  let component: ForgetSenhaComponent;
  let fixture: ComponentFixture<ForgetSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetSenhaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
