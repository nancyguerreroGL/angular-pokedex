import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonDetail } from './models/pokemon.interface';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const POKEDEX_API = 'https://pokeapi.co/api/v2/pokemon/';
const POKEDEX_IMAGE_BASE_URL = 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/';

const getPokedexImageUrl = (id: number): string => {
    return `${POKEDEX_IMAGE_BASE_URL}${String(id).padStart(3, '0')}.png`;
};

export interface PokemonPage {
    pokemon: PokemonDetail[];
    hasMore: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class PokedexDashboardService {
    constructor(private http: HttpClient){}

    getPokemon(limit: number = 24, offset: number = 0): Observable<PokemonPage> {
        return this.http.get<Pokemon>(`${POKEDEX_API}?limit=${limit}&offset=${offset}`).pipe(
            switchMap((response) => {
                if (response.results.length === 0) {
                    return of({ pokemon: [], hasMore: false });
                }
                const detailRequests = response.results.map((item) =>
                    this.http.get<PokemonDetail>(`${POKEDEX_API}${item.name}`).pipe(
                        map((detail) => ({
                            ...detail,
                            imageUrl: getPokedexImageUrl(detail.id)
                        })),
                        catchError(() => of(null))
                    )
                );
                return forkJoin(detailRequests).pipe(
                    map((results) => ({
                        pokemon: results.filter((item): item is PokemonDetail => item !== null),
                        hasMore: !!response.next
                    }))
                );
            }),
            catchError((error) => {
                console.error('getPokemon error:', error);
                return of({ pokemon: [], hasMore: false });
            })
        );
    }
}
