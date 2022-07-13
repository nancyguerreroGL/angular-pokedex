import { Component, OnInit } from '@angular/core';
import  {PokedexDashboardService} from '../../pokedex-dahsboard.service';
import { Pokemon, PokemonDetail } from '../../models/pokemon.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexlistComponent implements OnInit {
  pokemonDetail: PokemonDetail[] = [];

  constructor(private pokedexService: PokedexDashboardService,
    private router: Router) { }

  ngOnInit(): void {
    this.pokedexService.getPokemon()
    .subscribe(response=> {
      this.pokemonDetail = response;
    })
  }

  handleView(event: PokemonDetail) {
    console.log('event', event)
    this.router.navigate(['/pokedex', event.name, event.id])
  }

}
