import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonografiaEMPREDEFESAComponent } from './monografia-em-pre-defesa.component';

describe('MonografiaEMPREDEFESAComponent', () => {
  let component: MonografiaEMPREDEFESAComponent;
  let fixture: ComponentFixture<MonografiaEMPREDEFESAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonografiaEMPREDEFESAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonografiaEMPREDEFESAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
