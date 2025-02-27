import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMonografiaComponent } from './add-monografia.component';

describe('AddMonografiaComponent', () => {
  let component: AddMonografiaComponent;
  let fixture: ComponentFixture<AddMonografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMonografiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMonografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
