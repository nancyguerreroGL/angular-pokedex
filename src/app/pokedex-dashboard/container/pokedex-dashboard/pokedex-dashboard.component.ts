import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokedexDashboardService } from '../../pokedex-dashboard.service';
import { PokemonDetail } from '../../models/pokemon.interface';

@Component({
  selector: 'pokedex-dashboard',
  templateUrl: './pokedex-dashboard.component.html',
  styleUrls: ['./pokedex-dashboard.component.scss']
})
export class PokedexDashboardComponent implements OnInit, OnChanges {
  @Input() pokemonList: PokemonDetail[] = [];
  @Input() isLoading = false;
  @Input() isLoadingMore = false;
  @Input() hasMore = true;
  @Output() loadMore = new EventEmitter<void>();

  constructor(private pokedexService: PokedexDashboardService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pokemonList']) {
      console.log('pokemonList updated', this.pokemonList);
    }
  }

  onLoadMore(): void {
    this.loadMore.emit();
  }
}
