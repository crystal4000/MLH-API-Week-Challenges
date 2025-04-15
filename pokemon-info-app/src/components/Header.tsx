import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-red-600 to-red-500 shadow-lg">
            <div className="container mx-auto px-4 py-5">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                        <img 
                            src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" 
                            alt="PokeAPI" 
                            className="h-10 mr-3 bg-white p-1 rounded" 
                        />
                        <h1 className="text-3xl font-bold text-white">Pokédex</h1>
                    </div>
                    
                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search Pokemon..." 
                                className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner"
                            />
                            <button className="absolute right-2 top-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-2 px-4 rounded-lg transition shadow">
                            Favorites
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition shadow">
                            Random
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;