import { Component, OnInit, AfterViewInit, Inject, ViewChildren, ContentChildren, QueryList } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { catchError, map, mergeMap, pairwise, retry, switchMap, tap } from 'rxjs/operators';
import {PokemonCardComponent} from '../pokedex-dashboard/component/pokemon-card/pokemon-card.component'

@Component({
  selector: 'pokedex-container',
  templateUrl: './pokedex-container.component.html',
  styleUrls: ['./pokedex-container.component.scss']
})


export class PokedexContainerComponent implements OnInit,  AfterViewInit{


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

  }

  /*private registerScrollEvent() {
    this.scrollEvent$ = fromEvent(this.document, 'scroll').subscribe((scroll)=> {
      console.log('scroll', scroll)
    });

  }*/

  

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
