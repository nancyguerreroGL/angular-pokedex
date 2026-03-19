import { Component, NgZone, OnInit } from '@angular/core';
import { PokedexDashboardService } from '../pokedex-dashboard/pokedex-dashboard.service';
import { PokemonDetail } from '../pokedex-dashboard/models/pokemon.interface';

const PAGE_LIMIT = 24;

@Component({
  selector: 'pokedex-container',
  templateUrl: './pokedex-container.component.html',
  styleUrls: ['./pokedex-container.component.scss']
})
export class PokedexContainerComponent implements OnInit {
  pokemonList: PokemonDetail[] = [];
  isLoading = true;
  isLoadingMore = false;
  hasMore = false;
  private offset = 0;

  constructor(private pokedexService: PokedexDashboardService, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loadPokemon();
  }

  loadMore(): void {
    if (this.isLoadingMore || !this.hasMore) return;
    this.isLoadingMore = true;
    this.loadPokemon();
  }

  private loadPokemon(): void {
    this.pokedexService.getPokemon(PAGE_LIMIT, this.offset).subscribe((page) => {
      this.ngZone.run(() => {
        this.pokemonList = [...this.pokemonList, ...page.pokemon];
        this.hasMore = page.hasMore;
        this.offset += PAGE_LIMIT;
        this.isLoading = false;
        this.isLoadingMore = false;
      });
    });
  }
}
