import { useEffect, useState } from 'react';
import { fetchPokemon } from '../api/pokeApi';
import { Pokemon } from '../types/pokemon';

const usePokemon = (pokemonName: string) => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchPokemon(pokemonName);
                setPokemon(data);
            } catch (err) {
                setError('Failed to fetch Pokémon data');
            } finally {
                setLoading(false);
            }
        };

        getPokemon();
    }, [pokemonName]);

    return { pokemon, loading, error };
};

export default usePokemon;