import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetail, Pokemon_Sepecies } from '../../models/pokemon.interface';
import { PokedexDashboardService } from '../../pokedex-dahsboard.service';
const POKEMON_GENDER = 
  {
    female: {
      gender: 'female',
      class: 'material-symbols-outlined'
    },
    male: {
      gender: 'male',
      class: 'material-symbols-outlined'
    },
    unknown: {
      gender: 'unknown',
      class: ''
    }
  }

@Component({
  selector: 'pokemon-ability-info',
  templateUrl: './pokemon-ability-info.component.html',
  styleUrls: ['./pokemon-ability-info.component.scss']
})
export class PokemonAbilityInfoComponent implements OnInit {
  @Input() pokemonInfo!: PokemonDetail;
  pokemonSpecie$!: Observable<Pokemon_Sepecies>


  constructor(private service: PokedexDashboardService) { }

  ngOnInit(): void {
    this.pokemonSpecie$ = this.service.getPokemonSpecies(this.pokemonInfo.name)
  }

buildSingleGender(gender_rate: number) {
    return gender_rate === 8 ? [POKEMON_GENDER.female] : [POKEMON_GENDER.male]
}

buildGender(gender_rate: number, has_gender_differences: boolean) {
  if(!has_gender_differences) {
     return [POKEMON_GENDER.female, POKEMON_GENDER.male]
  }
  return this.buildSingleGender(gender_rate)
}

  getGender(gender_rate: number, has_gender_differences: boolean) {
    if(gender_rate > 1) {
      this.buildGender(gender_rate, has_gender_differences)
    }
    return [POKEMON_GENDER.unknown]
  }

}
