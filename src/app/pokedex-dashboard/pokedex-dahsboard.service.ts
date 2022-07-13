import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http';
import { Pokemon, abilitie, PokemonDetail } from './models/pokemon.interface';
import { forkJoin, Observable, throwError } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { catchError, map, mergeMap, retry, switchMap, tap } from 'rxjs/operators';

const POKEDEX_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEDEX_IMAGE_BASE_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/"
const POKEDEX_IMAGE_FORMAT = '.png';
const getImageZeroDigit = (value: string) => {
    return value.length < 2? `${POKEDEX_IMAGE_BASE_URL}00${value}`: `${POKEDEX_IMAGE_BASE_URL}0${value}`
};

const getPokedex_image_base_number = (value: number) => {
    const convertId = value.toString();
    if(convertId.length < 3) {
        return getImageZeroDigit(convertId)
    }
    return `${POKEDEX_IMAGE_BASE_URL}`;
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
                        imageUrl: `${getPokedex_image_base_number(item.id)}${POKEDEX_IMAGE_FORMAT}`
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
        console.log('id on service', id)
        return this.http.get(`${POKEDEX_API}${name}`).pipe(
            map((item: any) => {
                console.log('item', item)
                return {
                    ...item,
                }
            })
        );
    }
}

