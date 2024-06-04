import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastingPeliculaEditComponent } from './casting-pelicula-edit.component';

describe('CastingPeliculaEditComponent', () => {
  let component: CastingPeliculaEditComponent;
  let fixture: ComponentFixture<CastingPeliculaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CastingPeliculaEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CastingPeliculaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
