import { Component, Input, OnInit } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon.interface'


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

}
