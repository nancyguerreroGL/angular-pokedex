import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexDashboardComponent } from './container/pokedex-dashboard/pokedex-dashboard.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';

@NgModule({
  declarations: [
    PokedexDashboardComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PokedexDashboardComponent
  ]
})
export class PokedexDashboardModule { }
