
import React, { useEffect, useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import SearchBar from './components/search/SearchBar';
import CurrentWeather from './components/weather/CurrentWeather';
import WeatherDetails from './components/weather/WeatherDetails';
import HourlyForecast from './components/weather/HourlyForecast';
import DailyForecast from './components/weather/DailyForecast';
import FavoritesList from './components/favorites/FavoritesList';
import WeatherAI from './components/assistant/WeatherAI';
import { getWeatherData } from './services/weatherService';
import './index.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ name: 'Comitán, MX', lat: 16.2511, lon: -92.1342 });
  const [showFavorites, setShowFavorites] = useState(false);

  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites');
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getWeatherData(location.lat, location.lon);
        setWeather(data);
      } catch (error) {
        console.error("Failed to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  const handleSearchSelect = (city) => {
    const displayName = city.name ? `${city.name}, ${city.country || ''}` : city.city;

    setLocation({
      name: displayName,
      lat: city.lat,
      lon: city.lon
    });
  };

  const toggleFavorite = () => {
    const exists = favorites.find(f => f.lat === location.lat && f.lon === location.lon);
    if (exists) {
      setFavorites(favorites.filter(f => f.lat !== location.lat));
    } else {
      const newFav = {
        city: location.name,
        lat: location.lat,
        lon: location.lon,
        icon: weather ? weather.current.icon : '❓',
        temp: weather ? weather.current.temp + '°' : '--'
      };
      setFavorites([...favorites, newFav]);
    }
  };

  const isFavorite = favorites.some(f => f.lat === location.lat && f.lon === location.lon);

  return (
    <MainLayout weatherGroup={weather ? weather.current.group : 'default'}>

      {}
      <header className="absolute top-0 w-full max-w-6xl flex items-center justify-between p-4 z-20">
        <div className="w-full max-w-md">
          <SearchBar onSearch={handleSearchSelect} />
        </div>
        <button
          onClick={() => setShowFavorites(true)}
          className="ml-4 px-4 py-2 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 backdrop-blur-md rounded-2xl text-white transition-all shadow-lg border border-white/10 flex items-center gap-2 group"
          title="Mis Ciudades Guardadas"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">⭐</span>
          <span className="font-medium text-sm hidden sm:inline">Favoritos</span>
        </button>
      </header>

      {}
      {}
      <div className="flex-1 flex flex-col w-full z-10 pt-24 pb-10 px-4 md:px-8 overflow-y-auto md:overflow-y-auto custom-scrollbar">

        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white/50"></div>
          </div>
        ) : weather && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full h-full auto-rows-min md:auto-rows-auto">
            {/* Left: Main Display */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <CurrentWeather
                city={location.name}
                temp={weather.current.temp}
                description={weather.current.description}
                icon={weather.current.icon}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />

              {}
              <div className="w-full max-w-lg mx-auto">
                <WeatherAI weather={weather.current} city={location.name} />
              </div>

              <div className="mt-8 bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-xl">
                <HourlyForecast data={weather.hourly} />
              </div>
            </div>

            {}
            <div className="flex flex-col gap-6">
              <div className="bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10 shadow-xl">
                <WeatherDetails data={weather.current} />
              </div>
              <DailyForecast data={weather.daily} />
            </div>
          </div>
        )}

      </div>

      {}
      {showFavorites && (
        <FavoritesList
          favorites={favorites}
          onClose={() => setShowFavorites(false)}
          onSelect={(city) => handleSearchSelect(city)}
        />
      )}

    </MainLayout>
  );
}

export default App;