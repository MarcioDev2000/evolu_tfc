import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefesaMarcadaComponent } from './defesa-marcada.component';

describe('DefesaMarcadaComponent', () => {
  let component: DefesaMarcadaComponent;
  let fixture: ComponentFixture<DefesaMarcadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefesaMarcadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefesaMarcadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
