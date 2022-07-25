import { Component, OnInit, AfterViewInit } from '@angular/core';
import  {PokedexDashboardService} from '../../pokedex-dahsboard.service';
import { PokemonDetail } from '../../models/pokemon.interface';
import { map, filter, debounceTime, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromEvent, Observable} from 'rxjs';
import { Store } from '../../store';
@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html'
})
export class PokedexlistComponent implements OnInit, AfterViewInit {
 // pokemonDetail: PokemonDetail[] = [];
  pageByScroll$ = fromEvent(window, 'scroll');
  pokedexPaginationUrl?: string;
  numberOfItems = 12;// number of items in a page
  itemHeight = 1000;
  showLoadMore: boolean = true;
  showLoader: boolean = false;
  pokedexResults$?: Observable<any>;
  nextUrl: object = {
    next: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12'
  }

  constructor(
    private pokedexService: PokedexDashboardService,
    private router: Router,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.pokedexResults$ = this.store.select('next', 'previous', 'results');
    this.pokedexService.getPokemon().subscribe();
  }

  ngAfterViewInit(){
   this.pageByScroll$.pipe(
      map(()=> window.scrollY),
      filter((current)=> current >= document.body.clientHeight - window.innerHeight),
      debounceTime(200),
      mergeMap(()=> 'test')
    )
  }

  loadMorePokemon(pokemonDetail: PokemonDetail) {

   // this.showLoader = true;
    this.pokedexResults$ = this.store.select('next', 'previous', 'results');
    this.pokedexService.getPokemon().subscribe();
  }

  handleView(event: PokemonDetail) {
    console.log('event', event)
    this.router.navigate(['/pokedex', event.name, event.id])
  }
}
