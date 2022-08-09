import { Injectable, ElementRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Pokemon, abilitie, PokemonDetail, Pokemon_Sepecies, PokemonUrl } from './models/pokemon.interface';
import { forkJoin, Observable, throwError } from 'rxjs';
import { delay, map, mergeMap, retry, switchMap, tap, startWith } from 'rxjs/operators';
import { Store } from '../store';

const POKEDEX_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEDEX_IMAGE_BASE_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const POKEDEX_IMAGE_BASE_FULL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
const POKEMON_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const POKEDEX_IMAGE_FORMAT = '.png';


const baseImgUrl = (isFullImg: boolean) => isFullImg ? `${POKEDEX_IMAGE_BASE_FULL}`: `${POKEDEX_IMAGE_BASE_URL}`;

const getImageZeroDigit = (id: string, isFullImg: boolean) => {
    const baseImg =  baseImgUrl(isFullImg);
    return id.length < 2? `${baseImg}00${id}`: `${baseImg}0${id}`
};

const getPokedex_image_base_number = (value: number, isFullImg: boolean) => {
    const convertId = value.toString();
    if(convertId.length < 3) {
        return getImageZeroDigit(convertId, isFullImg)
    }
    return `${baseImgUrl(isFullImg)}${convertId}`;
};



@Injectable()
export class PokedexDashboardService {
    constructor(private http: HttpClient, 
                private store: Store){}
    
    getPokemonList(): Observable<Pokemon> {
       const url = this.store.value.pokemonResults.next;
       return this.http.get<Pokemon>(url).pipe(
        switchMap((items: Pokemon) => {
            const {results} = items;
            const pokemonDetailRequest = results.map((item) =>  this.getPokemonDetail(item.name, false));
            return forkJoin(pokemonDetailRequest).pipe(
                delay(1500),
                map((pokemonResultsArray: PokemonDetail[]) => {
                return {
                        count: items.count,
                        next: items.next,
                        results: [...this.store.value.pokemonResults.results, ...pokemonResultsArray] ,
                        previous: items.previous
                    };
                }),
            )
            }), tap((nextState)=>{
                this.store.set('pokemonResults', nextState)
            })
        );
    };

    getPokemonDetail(name: string, isFullImg: boolean): Observable<PokemonDetail> {
        return this.http.get<PokemonDetail>(`${POKEDEX_API}${name}`).pipe(
            map((item: any) => {
                return {
                    ...item,
                    imageUrl: `${getPokedex_image_base_number(item.id, isFullImg)}${POKEDEX_IMAGE_FORMAT}`
                }
            })
        );
    }

    getPokemonSpecies(name:string): Observable<Pokemon_Sepecies> {
     return this.http.get(`${POKEMON_SPECIES}${name}`)
     .pipe(
         map((item: any)=> item)
     )
    }

}

