import React from 'react';

const DetailCard = ({ icon, label, value }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300">
        <span className="text-2xl mb-2 text-white/90">{icon}</span>
        <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">{label}</span>
        <span className="text-xl font-bold mt-1">{value}</span>
    </div>
);

const WeatherDetails = ({ data }) => {
    return (
        <div className="grid grid-cols-2 gap-4 w-full mt-6">
            <DetailCard icon="💧" label="Humedad" value={`${data.humidity}%`} />
            <DetailCard icon="💨" label="Viento" value={`${data.windSpeed} km/h`} />
            <DetailCard icon="⏲️" label="Presión" value={`${data.pressure} hPa`} />
            <DetailCard icon="🌧️" label="Lluvia" value={`${data.precipitation} mm`} />
        </div>
    );
};

export default WeatherDetails;
