export interface PokemonListItem {
  name: string,
  url: string,
}

export interface Pokemon {
  count: number,
  next: string | null,
  results: PokemonListItem[],
}

export interface PokemonDetail {
  abilities: [],
  base_experience: number,
  forms: [],
  game_indices: [],
  height: number,
  held_items: [],
  id: number,
  imageUrl: string,
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