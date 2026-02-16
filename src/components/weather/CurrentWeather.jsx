import React from 'react';

const CurrentWeather = ({ city, temp, description, icon, isFavorite, onToggleFavorite }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
                <h2 className="text-4xl font-bold tracking-tight drop-shadow-md">{city}</h2>
                <button
                    onClick={onToggleFavorite}
                    className="text-2xl hover:scale-125 transition-transform drop-shadow-md"
                    title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <p className="text-lg text-white/90 font-light">{new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}</p>

            <div className="relative mb-6 group">
                <div className="absolute inset-0 bg-yellow-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                <span className="text-9xl drop-shadow-lg relative z-10 block transform hover:scale-110 transition-transform duration-500 cursor-default">
                    {icon}
                </span>
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-center">
                    <span className="text-8xl font-thin tracking-tighter drop-shadow-2xl">
                        {temp}
                    </span>
                    <span className="text-4xl font-light mb-8 ml-1">°C</span>
                </div>
                <p className="text-2xl font-medium tracking-wide capitalize">{description}</p>
            </div>
        </div>
    );
};

export default CurrentWeather;
