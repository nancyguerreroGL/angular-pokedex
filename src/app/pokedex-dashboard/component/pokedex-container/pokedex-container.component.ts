import { Component, OnInit, AfterViewInit, Inject, ViewChildren, ContentChildren, QueryList } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { catchError, debounceTime, filter, map, mergeMap, pairwise, retry, switchMap, tap } from 'rxjs/operators';
import {PokemonCardComponent} from '../pokemon-card/pokemon-card.component'
import { PokedexDashboardService } from '../../pokedex-dahsboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-container',
  templateUrl: './pokedex-container.component.html',
  styleUrls: ['./pokedex-container.component.scss']
})


export class PokedexContainerComponent implements OnInit{

  pokedexPaginationUrl?: string;
  showLoadMore: boolean = true;
  showLoader: boolean = true;
  pokedexResultsObs!: Observable<any>;



  constructor( private pokedexService: PokedexDashboardService,
    private router: Router) { }


  ngOnInit(): void {
   this.pokedexResultsObs = this.pokedexService.getPokemonList()
 }



 onLoadmore() {
  this.loadMorePokemon()
 }

 loadMorePokemon() {
  this.pokedexResultsObs = this.pokedexService.getPokemonList()
 }


}
