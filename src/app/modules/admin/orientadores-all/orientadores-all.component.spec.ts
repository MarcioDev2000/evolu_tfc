import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientadoresAllComponent } from './orientadores-all.component';

describe('OrientadoresAllComponent', () => {
  let component: OrientadoresAllComponent;
  let fixture: ComponentFixture<OrientadoresAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrientadoresAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrientadoresAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
