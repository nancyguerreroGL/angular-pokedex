import { Component, OnInit } from '@angular/core';
import  {PokedexDashboardService} from '../../passenger-dahsboard.service';
import { Pokemon, PokemonDetail } from '../../models/pokemon.interface';

@Component({
  selector: 'pokedex-dashboard',
  templateUrl: './pokedex-dashboard.component.html',
  styleUrls: ['./pokedex-dashboard.component.scss']
})
export class PokedexDashboardComponent implements OnInit {
  pokemonDetail: PokemonDetail[] = [];

  constructor(private pokedexService: PokedexDashboardService) { }

  ngOnInit(): void {
    this.pokedexService.getPokemon()
    .subscribe(response=> {
      this.pokemonDetail = response;
      console.log('response', response)
    })
  }

}
