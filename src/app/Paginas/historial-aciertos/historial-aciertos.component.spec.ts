import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAciertosComponent } from './historial-aciertos.component';

describe('HistorialAciertosComponent', () => {
  let component: HistorialAciertosComponent;
  let fixture: ComponentFixture<HistorialAciertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialAciertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialAciertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
