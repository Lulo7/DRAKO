import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearcontrasenaComponent } from './crearcontrasena.component';

describe('CrearcontrasenaComponent', () => {
  let component: CrearcontrasenaComponent;
  let fixture: ComponentFixture<CrearcontrasenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearcontrasenaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearcontrasenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
