import React from 'react';
import { Pokemon } from '../types/pokemon';

interface PokemonDetailProps {
    pokemon: Pokemon | null;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
    if (!pokemon) {
        return <div className="text-center">Select a Pokémon to see details</div>;
    }

    return (
        <div className="p-4 border rounded shadow-lg">
            <h2 className="text-2xl font-bold">{pokemon.name}</h2>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-32 h-32" />
            <div className="mt-4">
                <h3 className="text-xl">Abilities:</h3>
                <ul>
                    {pokemon.abilities.map((ability, index) => (
                        <li key={index}>{ability.ability.name}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="text-xl">Height:</h3>
                <p>{pokemon.height} decimetres</p>
            </div>
            <div className="mt-4">
                <h3 className="text-xl">Moves:</h3>
                <ul>
                    {pokemon.moves.slice(0, 5).map((move, index) => (
                        <li key={index}>{move.move.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PokemonDetail;