import React, { useState, useEffect, useRef } from 'react';
import { searchCity } from '../../services/weatherService';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 2) {
                const results = await searchCity(query);
                setSuggestions(results);
                setShowSuggestions(true);
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounce = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(debounce);
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    const handleSelect = (city) => {
        onSearch(city);
        setQuery('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (suggestions.length > 0) {
            handleSelect(suggestions[0]);
        }
    };

    return (
        <div ref={wrapperRef} className="relative group w-full z-50">
            <form onSubmit={handleSubmit} className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-white/70">🔍</span>
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-white/30 rounded-xl leading-5 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:border-white/50 focus:ring-0 transition-all duration-300 sm:text-sm backdrop-blur-md shadow-sm"
                    placeholder="Buscar ciudad..."
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <button
                        type="button"
                        className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                        title="Usar mi ubicación"
                    >
                        📍
                    </button>
                </div>
            </form>

            {}
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl mt-2 overflow-hidden shadow-xl max-h-60 overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2">
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            onClick={() => handleSelect(city)}
                            className="px-4 py-3 hover:bg-white/20 cursor-pointer text-white flex items-center justify-between border-b border-white/10 last:border-0 transition-colors"
                        >
                            <div>
                                <span className="font-medium block">{city.name}</span>
                                <span className="text-xs text-white/60">{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</span>
                            </div>
                            <span className="text-xs font-mono text-white/40">{city.country_code}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
