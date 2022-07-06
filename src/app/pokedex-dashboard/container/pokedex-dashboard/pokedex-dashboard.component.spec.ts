import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexDashboardComponent } from './pokedex-dashboard.component';

describe('PokedexDashboardComponent', () => {
  let component: PokedexDashboardComponent;
  let fixture: ComponentFixture<PokedexDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
