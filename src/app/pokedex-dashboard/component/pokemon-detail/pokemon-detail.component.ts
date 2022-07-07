import { Component, Input, OnInit } from '@angular/core';
import { Pokemon, abilitie, PokemonDetail } from '../../models/pokemon.interface'


@Component({
  selector: 'pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  @Input() detail?: PokemonDetail

  constructor() { }

  ngOnInit(): void {
  }

  getAbilitie(ability: any){
    return ability.type ? ability.type.name: null
  }

}
