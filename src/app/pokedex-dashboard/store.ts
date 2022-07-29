import { BehaviorSubject, Observable } from "rxjs";
import { Pokemon, PokemonDetail } from './models/pokemon.interface';
import {distinctUntilChanged, map, pluck} from 'rxjs/operators';
import { User } from '../auth/shared/services/auth/auth.service';
const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=12"

export interface State {
   // user: User,
    [key: string]: any
}

const state: State = {
  pokemonResults:  {
    next: INITIAL_URL,
    previous: undefined,
    results: [],
  },
  user: undefined

}

export class Store {
    private subject = new BehaviorSubject<any>(state);
    private store = this.subject.asObservable().pipe(
        distinctUntilChanged()
    );

    get value() {
     return this.subject.value;
    }

    select<T>(...args: Array<string>): Observable<T> {
        return this.store.pipe(
            map((value)=> {
                return value
            })
        )
    }

    set(name: string, state: any) {
        this.subject.next({ ...this.value, [name]: state });
    }
}