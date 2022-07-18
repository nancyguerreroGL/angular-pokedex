import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Pokemon, abilitie, PokemonDetail, Pokemon_Sepecies } from './models/pokemon.interface';
import { forkJoin, Observable, throwError } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { catchError, map, mergeMap, retry, switchMap, tap } from 'rxjs/operators';

const POKEDEX_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEDEX_IMAGE_BASE_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
const POKEDEX_IMAGE_BASE_FULL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full/";
const POKEMON_SPECIES = "https://pokeapi.co/api/v2/pokemon-species/";
const POKEDEX_IMAGE_FORMAT = '.png';

const baseImgUrl = (isFullImg: boolean) => isFullImg ? POKEDEX_IMAGE_BASE_FULL: POKEDEX_IMAGE_BASE_URL;

const getImageZeroDigit = (value: string, isFullImg: boolean) => {
    const baseImg =  baseImgUrl(isFullImg);
    return value.length < 2? `${baseImg}00${value}`: `${baseImg}0${value}`
};

const getPokedex_image_base_number = (value: number, isFullImg: boolean) => {
    const convertId = value.toString();
    if(convertId.length < 3) {
        return getImageZeroDigit(convertId, isFullImg)
    }
    return baseImgUrl(isFullImg);
};

@Injectable()
export class PokedexDashboardService {
    constructor(private http: HttpClient){}
    getPokemon(): Observable<any> {

        // get the items
       return this.http.get<Pokemon>(POKEDEX_API).pipe(
            switchMap((items) => {
            const results = items.results
            const itemRequests = results.map((item) => this.http.get(`${POKEDEX_API}${item.name}`).pipe(
                map((item: any) => {
                    return {
                        ...item,
                        imageUrl: `${getPokedex_image_base_number(item.id, false)}${POKEDEX_IMAGE_FORMAT}`
                    }
                })
            ));
            return forkJoin(itemRequests).pipe(
                map((itemRequests) => {
                    return itemRequests
                })
            );
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

