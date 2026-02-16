import React from 'react';

const HourlyForecast = ({ data }) => {
    return (
        <div className="mb-6">
            <h3 className="text-white/80 font-semibold mb-4 text-sm uppercase tracking-wider">Próximas Horas</h3>
            <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide mask-fade-right">
                {data.map((item, index) => (
                    <div key={index} className="flex-shrink-0 flex flex-col items-center p-3 bg-white/5 rounded-2xl border border-white/10 min-w-[70px] backdrop-blur-sm hover:bg-white/10 transition-colors">
                        <span className="text-xs text-white/70 mb-2">{item.time}</span>
                        <span className="text-2xl mb-2">{item.icon}</span>
                        <span className="font-bold">{item.temp}</span>
                        {item.pop > 0 && (
                            <span className="text-[10px] text-blue-200 mt-1 font-medium">{item.pop}%</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
