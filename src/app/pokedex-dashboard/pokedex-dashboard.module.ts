import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexDashboardComponent } from './container/pokedex-dashboard/pokedex-dashboard.component';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { HttpClientModule } from '@angular/common/http';

//services 
import {PokedexDashboardService} from './passenger-dahsboard.service'



@NgModule({
  declarations: [
    PokedexDashboardComponent,
    PokemonDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PokedexDashboardComponent
  ],
  providers: [
    PokedexDashboardService
  ]
})
export class PokedexDashboardModule { }
