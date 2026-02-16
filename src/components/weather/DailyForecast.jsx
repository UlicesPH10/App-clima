import React from 'react';

const DailyForecast = ({ data }) => {
    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 h-full">
            <h3 className="text-white/90 font-bold mb-6 text-lg flex items-center gap-2">
                <span>📅</span> Pronóstico
            </h3>
            <div className="space-y-4">
                {data.map((day, index) => (
                    <div key={index} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-xl transition-colors">
                        <span className="font-medium text-white/90 w-16 sm:w-24 text-left">{day.day}</span>
                        <div className="flex items-center gap-2 flex-1 justify-center">
                            <span className="text-2xl">{day.icon}</span>
                            {day.rain !== '0%' && (
                                <span className="text-[10px] sm:text-xs text-blue-100 font-semibold bg-blue-500/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    {day.rain}
                                </span>
                            )}
                        </div>
                        <div className="text-right w-24 flex items-center justify-end gap-2">
                            <span className="font-bold text-white text-lg">{day.max}</span>
                            <span className="text-white/50 text-sm">{day.min}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyForecast;
