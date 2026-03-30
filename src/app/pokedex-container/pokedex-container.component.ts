import { Component, NgZone, OnInit } from '@angular/core';
import { PokedexDashboardService } from '../pokedex-dashboard/pokedex-dashboard.service';
import { PokemonDetail } from '../pokedex-dashboard/models/pokemon.interface';

const PAGE_SIZE = 24;

@Component({
  selector: 'pokedex-container',
  templateUrl: './pokedex-container.component.html',
  styleUrls: ['./pokedex-container.component.scss']
})
export class PokedexContainerComponent implements OnInit {
  pokemonList: PokemonDetail[] = [];
  isLoading = true;
  isLoadingMore = false;
  hasMore = true;
  private offset = 0;

  constructor(private pokedexService: PokedexDashboardService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.pokedexService.getPokemon(PAGE_SIZE, 0).subscribe(({ pokemon, hasMore }) => {
      this.ngZone.run(() => {
        this.pokemonList = pokemon;
        this.hasMore = hasMore;
        this.isLoading = false;
      });
    });
  }

  loadMore(): void {
    if (this.isLoadingMore || !this.hasMore) return;
    this.isLoadingMore = true;
    this.offset += PAGE_SIZE;
    this.pokedexService.getPokemon(PAGE_SIZE, this.offset).subscribe(({ pokemon, hasMore }) => {
      this.ngZone.run(() => {
        this.pokemonList = [...this.pokemonList, ...pokemon];
        this.hasMore = hasMore;
        this.isLoadingMore = false;
      });
    });
  }
}
