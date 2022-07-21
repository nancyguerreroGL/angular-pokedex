import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, ParamMap } from '@angular/router';
import {PokedexDashboardService} from '../../pokedex-dahsboard.service';
import {PokemonDetail} from '../../models/pokemon.interface'
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon$!: Observable<PokemonDetail>
  pokemon!: PokemonDetail;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PokedexDashboardService
    ) { }

  ngOnInit(): void {
   this.pokemon$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const name = params.get('name')!
        const id = params.get('id')!
        return this.service.getPokemonDetail(name, id)
      }))
  }

  gotoPokemon(pokemon: PokemonDetail) {
    const pokeId = pokemon ? pokemon.id : null;
    this.router.navigate(['/pokedex', {id: pokeId }])
  }

  getAbilitie(ability: any){
    return ability.type ? ability.type.name: null
  }

}
