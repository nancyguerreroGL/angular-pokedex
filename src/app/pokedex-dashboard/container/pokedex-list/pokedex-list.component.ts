import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import  {PokedexDashboardService} from '../../pokedex-dahsboard.service';
import { PokemonDetail, Pokemon } from '../../models/pokemon.interface';
import { Router } from '@angular/router';
import { fromEvent, Observable} from 'rxjs';
import { Store } from '../../../store';
@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html'
})
export class PokedexlistComponent implements OnInit {
 // pokemonDetail: PokemonDetail[] = [];
  pageByScroll$ = fromEvent(window, 'scroll');
  pokedexPaginationUrl?: string;
  showLoadMore: boolean = true;
  showLoader: boolean = true;
  private _pokedexResults: any = null;
  @Output() loadMoreResults = new EventEmitter();
  @Input('pokedexResults')
  get pokedexResults() {
    return this._pokedexResults
  }

  set pokedexResults(value) {
    if(value) {
      this._pokedexResults = value
    }
  }

  ngOnInit(): void {
   console.log('pokedexResults', this.pokedexResults)
 }

  constructor(
    private pokedexService: PokedexDashboardService,
    private router: Router,
    private store: Store
    ) { }

  
  loadMore() {
    this.loadMoreResults.emit()
  }

  handleView(event: PokemonDetail) {
    console.log('event', event)
    this.router.navigate(['/pokedex', event.name, event.id])
  }
}
