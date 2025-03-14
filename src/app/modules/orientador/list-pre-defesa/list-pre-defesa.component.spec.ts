import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPreDefesaComponent } from './list-pre-defesa.component';

describe('ListPreDefesaComponent', () => {
  let component: ListPreDefesaComponent;
  let fixture: ComponentFixture<ListPreDefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPreDefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPreDefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
