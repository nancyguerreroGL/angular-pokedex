export interface Pokemon {
  results: PokemonDetail[],
}

export interface abilitie {
  name: string,
  url: string,
}

export interface PokemonDetail {
  abilities: [],
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
  types: [],
  weight: number
}