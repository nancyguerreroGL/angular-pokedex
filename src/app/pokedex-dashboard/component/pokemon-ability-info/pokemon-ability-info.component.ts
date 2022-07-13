import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon.interface';

@Component({
  selector: 'pokemon-ability-info',
  templateUrl: './pokemon-ability-info.component.html',
  styleUrls: ['./pokemon-ability-info.component.scss']
})
export class PokemonAbilityInfoComponent implements OnInit {
  @Input() pokemonInfo!: PokemonDetail

  constructor() { }

  ngOnInit(): void {
  }

}
