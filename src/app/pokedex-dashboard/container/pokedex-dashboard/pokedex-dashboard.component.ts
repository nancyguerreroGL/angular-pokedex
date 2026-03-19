import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import  {PokedexDashboardService} from '../../pokedex-dashboard.service';
import { PokemonDetail } from '../../models/pokemon.interface';

@Component({
  selector: 'pokedex-dashboard',
  templateUrl: './pokedex-dashboard.component.html',
  styleUrls: ['./pokedex-dashboard.component.scss']
})
export class PokedexDashboardComponent implements OnInit, OnChanges {
  @Input() pokemonList: PokemonDetail[] = [];

  constructor(private pokedexService: PokedexDashboardService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonList']) {
      console.log('pokemonList updated', this.pokemonList);
    }
  }

}
