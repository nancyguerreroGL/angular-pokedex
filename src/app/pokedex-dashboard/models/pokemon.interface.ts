export interface Pokemon {
  next: string,
  previous?: string
  results?: Array<PokemonDetail>,
}

export interface abilitie {
  ability : {
    name: string,
    url: string,
  },
  is_hidden: boolean,
  slot: number
}

export interface PokemonDetail {
  abilities: Array<abilitie>,
  base_experience: number,
  forms: [],
  game_indices: [],
  height: number,
  held_items: [],
  id: number,
  imageUrl: object,
  is_default: boolean,
  location_area_encounters: string,
  moves: [],
  name: string,
  order: number,
  past_types: [],
  species: object,
  sprites: any,
  stats: [],
  types: Array<any>,
  weight: number
}

export interface Pokemon_Sepecies {
  base_happiness: number,
  capture_rate: number,
  color: object,
  egg_groups: Array<object>,
  evolution_chain: object,
  evolves_from_species: any,
  flavor_text_entries: Array<object>,
  form_descriptions: Array<any>,
  forms_switchable: boolean,
  gender_rate: number,
  genera: Array<object>,
  generation: object,
  growth_rate:object,
  habitat: object,
  has_gender_differences:boolean,
  hatch_counter: number,
  id: number,
  is_baby:boolean,
  is_legendary:boolean,
  is_mythical:boolean,
  name:string,
  names: Array<object>,
  pal_park_encounters: Array<object>,
  pokedex_numbers: Array<object>,
  shape: object,
  varieties: Array<object>
  }

