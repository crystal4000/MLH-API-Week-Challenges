import React, { useEffect, useState } from 'react';
import { fetchPokemon } from '../api/pokeApi';
import PokemonCard from './PokemonCard';
import { Pokemon } from '../types/pokemon';

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadPokemon = async () => {
            try {
                const promises = Array.from({ length: 20 }, (_, index) => fetchPokemon(index + 1));
                const results = await Promise.all(promises);
                setPokemonList(results);
            } catch (err) {
                setError('Failed to fetch Pokémon data');
            } finally {
                setLoading(false);
            }
        };

        loadPokemon();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-bounce bg-red-500 p-2 w-16 h-16 ring-1 ring-slate-900/5 rounded-full flex items-center justify-center">
                    <svg className="text-white w-8 h-8" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.9 11.6h-4.7m4.7 0v4.7m0-4.7L16 15.8M4.1 12.4h4.7m-4.7 0V7.7m0 4.7L8 8.2"/>
                    </svg>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-center text-red-500 font-bold bg-red-100 rounded-lg">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemonList.map(pokemon => (
                    <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
            </div>
        </div>
    );
};

export default PokemonList;