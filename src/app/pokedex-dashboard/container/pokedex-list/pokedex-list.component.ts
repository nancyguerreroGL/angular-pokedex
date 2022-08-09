import { Component, OnInit, AfterViewInit } from '@angular/core';
import  {PokedexDashboardService} from '../../pokedex-dahsboard.service';
import { PokemonDetail, Pokemon } from '../../models/pokemon.interface';
import { map, filter, debounceTime, mergeMap, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromEvent, Observable} from 'rxjs';
import { Store } from '../../../store';
@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html'
})
export class PokedexlistComponent implements OnInit, AfterViewInit {
 // pokemonDetail: PokemonDetail[] = [];
  pageByScroll$ = fromEvent(window, 'scroll');
  pokedexPaginationUrl?: string;
  showLoadMore: boolean = true;
  showLoader: boolean = false;
  pokedexResults$?: Observable<any>;

  constructor(
    private pokedexService: PokedexDashboardService,
    private router: Router,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.pokedexResults$ = this.store.select('pokemonResults');
    this.pokedexService.getPokemonList().subscribe();
  }

  ngAfterViewInit(){
   this.pageByScroll$.pipe(
      map(()=> window.scrollY),
      filter((current)=> current >= document.body.clientHeight - window.innerHeight),
      debounceTime(200),
    ).subscribe((data)=> {
      this.loadMorePokemon()
    })
  }

  loadMorePokemon() {
    this.showLoadMore = false;
    this.pokedexResults$ = this.store.select('pokemonResults');
    this.pokedexService.getPokemonList().subscribe();
  }

  handleView(event: PokemonDetail) {
    console.log('event', event)
    this.router.navigate(['/pokedex', event.name, event.id])
  }
}
