import { Component, OnInit, AfterViewInit } from '@angular/core';
import  {PokedexDashboardService} from '../../pokedex-dahsboard.service';
import { PokemonDetail } from '../../models/pokemon.interface';
import { map, filter, debounceTime, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { fromEvent} from 'rxjs';
const POKEDEX_API = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=12';
@Component({
  selector: 'pokedex-list',
  templateUrl: './pokedex-list.component.html'
})
export class PokedexlistComponent implements OnInit, AfterViewInit {
  pokemonDetail: PokemonDetail[] = [];
  pageByScroll$ = fromEvent(window, 'scroll');
  pokedexPaginationUrl?: string;
  numberOfItems = 12;// number of items in a page
  itemHeight = 1000;
  showLoadMore: boolean = true;
  showLoader: boolean = false;

  constructor(private pokedexService: PokedexDashboardService,
    private router: Router) { }

  ngOnInit(): void {
    this.pokedexService.getPokemon(POKEDEX_API)
    .subscribe(response=> {
      this.pokemonDetail = response.results;
      this.pokedexPaginationUrl = response.next
    })
  }

  ngAfterViewInit(){
    this.pageByScroll$.pipe(
      map(()=> window.scrollY),
      filter((current)=> current >= document.body.clientHeight - window.innerHeight),
      debounceTime(200),
      mergeMap(()=> {
        this.showLoader = true;
        return this.pokedexService.getPokemon(this.pokedexPaginationUrl)
      })
    ).subscribe((response)=> {
        const results = response.results
        this.pokemonDetail = [...this.pokemonDetail, ...results];
        this.pokedexPaginationUrl = response.next;
        this.showLoadMore = false;
    })
  }

  loadMorePokemon() {
    this.showLoadMore = false;
    this.showLoader = true;
    this.pokedexService.getPokemon(this.pokedexPaginationUrl)
    .subscribe(response=> {
      const results = response.results
      this.pokemonDetail = [...this.pokemonDetail, ...results];
      this.pokedexPaginationUrl = response.next;
      this.showLoader = false;
    })
  }

  handleView(event: PokemonDetail) {
    console.log('event', event)
    this.router.navigate(['/pokedex', event.name, event.id])
  }
}
