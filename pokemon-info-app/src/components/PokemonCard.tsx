import React from 'react';
import { Pokemon } from '../types/pokemon';

const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
    default: 'bg-gray-400'
};

interface PokemonCardProps {
    pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    const mainType = pokemon.types[0]?.type.name || 'default';
    const cardBgColor = `${typeColors[mainType]} bg-opacity-20`;
    
    return (
        <div className={`rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl ${cardBgColor}`}>
            <div className="flex justify-center p-4 bg-white bg-opacity-80">
                <img 
                    src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default} 
                    alt={pokemon.name}
                    className="h-40 w-40 object-contain"
                />
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold capitalize text-gray-800">
                        {pokemon.name}
                    </h2>
                    <span className="text-sm font-semibold text-gray-600">#{pokemon.id.toString().padStart(3, '0')}</span>
                </div>
                
                <div className="flex gap-2 mb-3">
                    {pokemon.types.map(typeInfo => (
                        <span 
                            key={typeInfo.type.name} 
                            className={`${typeColors[typeInfo.type.name] || typeColors.default} text-white text-xs px-2 py-1 rounded-full capitalize`}
                        >
                            {typeInfo.type.name}
                        </span>
                    ))}
                </div>
                
                <div className="space-y-2">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Abilities:</h3>
                        <p className="text-sm text-gray-600 capitalize">
                            {pokemon.abilities.slice(0, 2).map(a => a.ability.name).join(', ')}
                            {pokemon.abilities.length > 2 ? ', ...' : ''}
                        </p>
                    </div>
                    
                    <div className="flex justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700">Height:</h3>
                            <p className="text-sm text-gray-600">{pokemon.height / 10}m</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700">Weight:</h3>
                            <p className="text-sm text-gray-600">{pokemon.weight / 10}kg</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700">Moves:</h3>
                        <p className="text-sm text-gray-600 capitalize truncate">
                            {pokemon.moves.slice(0, 3).map(m => m.move.name).join(', ')}
                            {pokemon.moves.length > 3 ? ', ...' : ''}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;