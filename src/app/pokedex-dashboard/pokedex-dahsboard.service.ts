import { Injectable, ElementRef } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Pokemon, abilitie, PokemonDetail, Pokemon_Sepecies } from './models/pokemon.interface';
import { forkJoin, Observable, throwError } from 'rxjs';
import { map, mergeMap, retry, switchMap, tap } from 'rxjs/operators';
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
    constructor(private http: HttpClient, private store: Store){}
    
    getPokemon(): Observable<any> {
        const url = this.store.value.pokemonResults.next;
        // get the items
       return this.http.get(url).pipe(
            switchMap((items: any) => {
            const results = items.results
            const itemRequests = results.map((item: { name: any; }) => this.http.get(`${POKEDEX_API}${item.name}`).pipe(
                map((item: any) => {
                    return {
                        ...item,
                        imageUrl: `${getPokedex_image_base_number(item.id, false)}${POKEDEX_IMAGE_FORMAT}`
                    }
                })
            ));
            return forkJoin(itemRequests).pipe(
                map((itemRequests: any) => {
                    return {
                        next: items.next,
                        results: itemRequests,
                        previous: items.previous
                    }
                }),
            )
            }), tap((updatedInfo)=>{
                const nextState = {
                    next: updatedInfo.next,
                    results: [...this.store.value.pokemonResults.results, ...updatedInfo.results],
                    previous: updatedInfo.previous
                }
                this.store.set('pokemonResults', nextState)
            })
        );
    };

    getPokemonDetail(name: string, id: any): Observable<PokemonDetail> {
        return this.http.get(`${POKEDEX_API}${name}`).pipe(
            map((item: any) => {
                return {
                    ...item,
                    imageUrl: `${getPokedex_image_base_number(item.id, true)}${POKEDEX_IMAGE_FORMAT}`
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

