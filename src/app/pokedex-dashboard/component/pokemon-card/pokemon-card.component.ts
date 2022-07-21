import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Pokemon, abilitie, PokemonDetail } from '../../models/pokemon.interface'


@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() detail?: PokemonDetail

  @Output() view: EventEmitter<PokemonDetail> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  getAbilitie(ability: any){
    return ability.type ? ability.type.name: null
  }

 goToPokemon(detail: PokemonDetail | undefined) {
    this.view.emit(detail)
  }
}
