import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokedexlistComponent } from './container/pokedex-list/pokedex-list.component';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';

//services 
import {PokedexDashboardService} from './pokedex-dahsboard.service';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { PokemonAbilityInfoComponent } from './component/pokemon-ability-info/pokemon-ability-info.component';

const ROUTES: Routes = [
  {
    path: 'pokedex',
    children: [
      {path: '', component: PokedexlistComponent, pathMatch:'full'},
      {path:':name/:id', component: PokemonDetailComponent, data: { animation: 'hero' }}
    ]
  }
]


@NgModule({
  declarations: [
    PokedexlistComponent,
    PokemonCardComponent,
    PokemonDetailComponent,
    PokemonAbilityInfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    PokedexlistComponent,
    PokemonCardComponent
  ],
  providers: [
    PokedexDashboardService
  ]
})
export class PokedexDashboardModule { }
