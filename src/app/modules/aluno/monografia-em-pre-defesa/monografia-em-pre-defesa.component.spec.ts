import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonografiaEmPreDefesaComponent } from './monografia-em-pre-defesa.component';

describe('MonografiaEmPreDefesaComponent', () => {
  let component: MonografiaEmPreDefesaComponent;
  let fixture: ComponentFixture<MonografiaEmPreDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonografiaEmPreDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonografiaEmPreDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
