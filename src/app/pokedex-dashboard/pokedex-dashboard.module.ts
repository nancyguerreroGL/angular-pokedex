import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokedexlistComponent } from './container/pokedex-list/pokedex-list.component';
import { PokemonCardComponent } from './component/pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeLoaderComponent } from '../pokedex-dashboard/component/poke-loader/poke-loader.component';

//services 
import {PokedexDashboardService} from './pokedex-dahsboard.service';
import { PokemonDetailComponent } from './component/pokemon-detail/pokemon-detail.component';
import { PokemonAbilityInfoComponent } from './component/pokemon-ability-info/pokemon-ability-info.component';
import { WeightPipe } from './component/pokemon-ability-info/pipes/weight-pipe.pipe';
import { HeightPipe } from './component/pokemon-ability-info/pipes/height.pipe';

import {Store} from './store';

const ROUTES: Routes = [
  {
    path: 'pokedex',
    children: [
      {path: '', component: PokedexlistComponent, pathMatch:'full'},
      {path:':name/:id', component: PokemonDetailComponent}
    ]
  }
]


@NgModule({
  declarations: [
    PokedexlistComponent,
    PokemonCardComponent,
    PokemonDetailComponent,
    PokemonAbilityInfoComponent,
    WeightPipe,
    HeightPipe,
    PokeLoaderComponent
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
    PokedexDashboardService,
    Store
  ]
})
export class PokedexDashboardModule { }
