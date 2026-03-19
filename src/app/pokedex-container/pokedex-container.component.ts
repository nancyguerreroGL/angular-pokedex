import { Component, NgZone, OnInit } from '@angular/core';
import  {PokedexDashboardService} from '../pokedex-dashboard/passenger-dahsboard.service';

@Component({
  selector: 'pokedex-container',
  templateUrl: './pokedex-container.component.html',
  styleUrls: ['./pokedex-container.component.scss']
})
export class PokedexContainerComponent implements OnInit {
  pokemonList: any[] = [];


  constructor(private pokedexService: PokedexDashboardService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.pokedexService.getPokemon().subscribe((pokemonList) => {
      this.ngZone.run(() => {
        this.pokemonList = pokemonList;
      });
    });
  }

}
