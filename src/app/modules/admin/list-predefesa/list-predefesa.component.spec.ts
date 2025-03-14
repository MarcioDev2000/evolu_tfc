import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPredefesaComponent } from './list-predefesa.component';

describe('ListPredefesaComponent', () => {
  let component: ListPredefesaComponent;
  let fixture: ComponentFixture<ListPredefesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPredefesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPredefesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
