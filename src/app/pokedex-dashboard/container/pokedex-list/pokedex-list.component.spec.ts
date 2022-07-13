import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexlistComponent } from './pokedex-list.component';

describe('PokedexlistComponent', () => {
  let component: PokedexlistComponent;
  let fixture: ComponentFixture<PokedexlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokedexlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
