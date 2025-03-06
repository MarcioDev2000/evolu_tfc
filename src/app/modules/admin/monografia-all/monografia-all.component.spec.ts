import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonografiaAllComponent } from './monografia-all.component';

describe('MonografiaAllComponent', () => {
  let component: MonografiaAllComponent;
  let fixture: ComponentFixture<MonografiaAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonografiaAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonografiaAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
