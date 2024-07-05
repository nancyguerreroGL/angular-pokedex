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


export class PokedexContainerComponent implements OnInit,  AfterViewInit{

  pageByScroll$ = fromEvent(window, 'scroll');
  pokedexPaginationUrl?: string;
  showLoadMore: boolean = true;
  showLoader: boolean = true;
  pokedexResults: any;


  constructor( private pokedexService: PokedexDashboardService,
    private router: Router) { }


  ngOnInit(): void {
    this.loadMorePokemon()
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
   this.pokedexService.getPokemonList().subscribe((data) => {
       if(data.results.length > 0 ) {
         this.showLoader = false
       }
       this.pokedexResults = data
       console.log('data', data)
   })
 }

  

  calculateScrollPercent(target: any) {
    const {
      target: {
        scrollingElement: {
          scrollTop, 
          scrollHeight, 
          clientHeight
        }
      }
    } = target
    return (scrollTop/(scrollHeight-clientHeight))*100
  } 
}
