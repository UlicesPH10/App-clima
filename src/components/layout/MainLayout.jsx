import React from 'react';
import RainEffect from '../effects/RainEffect';

const MainLayout = ({ children, weatherGroup = 'default' }) => {

    const getBackgroundClass = (group) => {
        const backgrounds = {
            clear: 'from-orange-400 via-amber-300 to-blue-400',
            cloudy: 'from-gray-400 via-blue-300 to-blue-400',
            rain: 'from-slate-700 via-blue-800 to-gray-800',
            snow: 'from-blue-100 via-blue-300 to-indigo-200',
            storm: 'from-indigo-900 via-purple-900 to-slate-900',
            fog: 'from-gray-300 via-slate-300 to-gray-400',
            default: 'from-emerald-500 via-teal-600 to-cyan-600' 
        };
        return backgrounds[group] || backgrounds.default;
    };

    const showRain = weatherGroup === 'rain' || weatherGroup === 'storm';

    return (
        <div className={`min-h-screen bg-gradient-to-br ${getBackgroundClass(weatherGroup)} flex items-center justify-center p-4 relative overflow-hidden transition-all duration-1000 ease-in-out`}>
            {}
            <div className="absolute top-0 left-0 w-96 h-96 bg-lime-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>

            {}
            {showRain && <RainEffect />}

            <div className="relative z-10 w-full max-w-6xl min-h-screen md:min-h-0 md:h-[90vh] bg-transparent md:bg-white/10 backdrop-blur-none md:backdrop-blur-2xl rounded-none md:rounded-[3rem] shadow-none md:shadow-2xl border-none md:border border-white/20 overflow-y-auto md:overflow-hidden flex flex-col md:flex-row">
                {children}
            </div>
        </div>
    );
};

export default MainLayout;
