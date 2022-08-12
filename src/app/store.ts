import { BehaviorSubject, Observable } from "rxjs";
import { Pokemon, PokemonDetail } from './pokedex-dashboard/models/pokemon.interface';
import {distinctUntilChanged, map, pluck} from 'rxjs/operators';
import { User } from './auth/shared/services/auth/auth.service';
const INITIAL_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=8"

export interface State {
    user: User | undefined,
   pokemonResults: Pokemon
}

const state: State = {
  user: undefined,
  pokemonResults:  {
    count: undefined,
    next: INITIAL_URL,
    previous: undefined,
    results: [],
  }
}

export class Store {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable().pipe(
        distinctUntilChanged()
    );

    get value() {
     return this.subject.value;
    }

    select(name: string) {
        return this.store.pipe(
            pluck(name)
        )
    }

    set(name: string, state: any) {
        this.subject.next({ ...this.value, [name]: state });
    }
}