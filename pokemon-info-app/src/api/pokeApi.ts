import axios from 'axios';
import { Pokemon, PokemonListResponse } from '../types/pokemon';

const POKE_API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (limit = 20, offset = 0): Promise<PokemonListResponse> => {
  const response = await axios.get<PokemonListResponse>(`${POKE_API_URL}?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const fetchPokemonDetail = async (nameOrId: string | number): Promise<Pokemon> => {
  const response = await axios.get<Pokemon>(`${POKE_API_URL}/${nameOrId}`);
  return response.data;
};

// Add this function to match what's imported in PokemonList.tsx
export const fetchPokemon = async (nameOrId: string | number): Promise<Pokemon> => {
  return fetchPokemonDetail(nameOrId);
};