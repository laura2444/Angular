import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingPeliculaComponent } from './casting-pelicula.component';

describe('CastingPeliculaComponent', () => {
  let component: CastingPeliculaComponent;
  let fixture: ComponentFixture<CastingPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingPeliculaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastingPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
