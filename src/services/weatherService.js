import axios from 'axios';

const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';

// WMO Weather interpretation codes (WW)
// https://open-meteo.com/en/docs
const getWeatherInfo = (code) => {
    const codes = {
        0: { icon: '☀️', desc: 'Despejado', group: 'clear' },
        1: { icon: '🌤️', desc: 'Mayormente despejado', group: 'clear' },
        2: { icon: '⛅', desc: 'Parcialmente nublado', group: 'cloudy' },
        3: { icon: '☁️', desc: 'Nublado', group: 'cloudy' },
        45: { icon: '🌫️', desc: 'Niebla', group: 'fog' },
        48: { icon: '🌫️', desc: 'Niebla con escarcha', group: 'fog' },
        51: { icon: '🌦️', desc: 'Llovizna ligera', group: 'rain' },
        53: { icon: '�️', desc: 'Llovizna moderada', group: 'rain' },
        55: { icon: '🌧️', desc: 'Llovizna densa', group: 'rain' },
        61: { icon: '🌧️', desc: 'Lluvia ligera', group: 'rain' },
        63: { icon: '�️', desc: 'Lluvia moderada', group: 'rain' },
        65: { icon: '🌧️', desc: 'Lluvia fuerte', group: 'rain' },
        71: { icon: '❄️', desc: 'Nevada ligera', group: 'snow' },
        73: { icon: '❄️', desc: 'Nevada moderada', group: 'snow' },
        75: { icon: '❄️', desc: 'Nevada fuerte', group: 'snow' },
        80: { icon: '🌦️', desc: 'Chubascos ligeros', group: 'rain' },
        81: { icon: '🌧️', desc: 'Chubascos moderados', group: 'rain' },
        82: { icon: '⛈️', desc: 'Chubascos violentos', group: 'rain' },
        95: { icon: '⛈️', desc: 'Tormenta eléctrica', group: 'storm' },
        96: { icon: '⛈️', desc: 'Tormenta con granizo leve', group: 'storm' },
        99: { icon: '⛈️', desc: 'Tormenta con granizo fuerte', group: 'storm' },
    };
    return codes[code] || { icon: '❓', desc: 'Desconocido', group: 'unknown' };
};

export const getWeatherData = async (lat, lon) => {
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m',
                hourly: 'temperature_2m,weather_code,precipitation_probability',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
                timezone: 'auto'
            }
        });

        const data = response.data;
        const current = data.current;
        const weatherInfo = getWeatherInfo(current.weather_code);

        
        const currentData = {
            temp: Math.round(current.temperature_2m),
            feelsLike: Math.round(current.apparent_temperature),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            pressure: Math.round(current.surface_pressure),
            precipitation: current.precipitation,
            icon: weatherInfo.icon,
            description: weatherInfo.desc,
            group: weatherInfo.group, 
            isDay: current.is_day,
            uvIndex: 'N/A', 
            visibility: 'N/A' 
        };

        // proximas 24 horas
        const hourlyData = data.hourly.time.slice(0, 24).map((time, index) => {
            const date = new Date(time);
            return {
                time: date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' }),
                temp: Math.round(data.hourly.temperature_2m[index]) + '°',
                icon: getWeatherInfo(data.hourly.weather_code[index]).icon,
                pop: data.hourly.precipitation_probability[index]
            };
        });

        //  5 dias
        const dailyData = data.daily.time.slice(0, 5).map((time, index) => {
            const date = new Date(time);
            
            const dateObj = new Date(time + 'T12:00:00');
            const dayName = dateObj.toLocaleDateString('es-MX', { weekday: 'long' });

            return {
                day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
                icon: getWeatherInfo(data.daily.weather_code[index]).icon,
                min: Math.round(data.daily.temperature_2m_min[index]) + '°',
                max: Math.round(data.daily.temperature_2m_max[index]) + '°',
                rain: data.daily.precipitation_probability_max[index] > 0 ? `${data.daily.precipitation_probability_max[index]}%` : '0%'
            };
        });

        return { current: currentData, hourly: hourlyData, daily: dailyData };

    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export const searchCity = async (query) => {
    try {
        const response = await axios.get(GEO_API_URL, {
            params: {
                name: query,
                count: 5,
                language: 'es',
                format: 'json'
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            return [];
        }

        return response.data.results.map(city => ({
            id: city.id,
            name: city.name,
            country: city.country,
            admin1: city.admin1, 
            lat: city.latitude,
            lon: city.longitude,
            flag: city.country_code 
        }));
    } catch (error) {
        console.error("Error searching city:", error);
        return [];
    }
};
