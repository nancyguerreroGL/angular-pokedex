import { BehaviorSubject, Observable } from "rxjs";
import { Pokemon, PokemonDetail } from './models/pokemon.interface';
import {distinctUntilChanged, map, pluck} from 'rxjs/operators';
const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"

const state: Pokemon = {
  next: INITIAL_URL,
  previous: undefined,
  results: [],
}

export class Store {
    private subject = new BehaviorSubject<any>(state);
    private store = this.subject.asObservable().pipe(
        distinctUntilChanged()
    );

    get value() {
     return this.subject.value;
    }

    select<Pokemon>(...args: Array<string>): Observable<Pokemon> {
        return this.store.pipe(
            map((value)=> {
                console.log('value', value)
                return value
            })
        )
    }

    set(updatedState: any,...args: Array<string>) {
        const [next, previous, results] = args
        this.subject.next({
            [next]: updatedState.next,
            [previous]: updatedState.previous,
            [results]: [...this.value.results, ...updatedState.results]
         })
    }
}