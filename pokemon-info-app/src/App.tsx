import React from 'react';
import Header from './components/Header';
import PokemonList from './components/PokemonList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-6 pb-12">
        <PokemonList />
      </main>
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Data provided by <a href="https://pokeapi.co/" className="text-yellow-400 hover:underline">PokéAPI</a></p>
          <p className="text-sm mt-2 text-gray-400">© {new Date().getFullYear()} Pokémon Info App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;