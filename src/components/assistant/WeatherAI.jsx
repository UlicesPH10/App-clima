import React, { useState, useEffect } from 'react';
import { getGeminiRecommendation } from '../../services/geminiService';


const WeatherAI = ({ weather, city }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [apiKey, setApiKey] = useState('');
    const [hasKey, setHasKey] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            setHasKey(true);
        }
    }, []);

    const handleSaveKey = () => {
        if (apiKey.trim().length > 10) {
            localStorage.setItem('gemini_api_key', apiKey);
            setHasKey(true);
        }
    };

    const handleAsk = async () => {
        setLoading(true);
        try {
            const result = await getGeminiRecommendation(apiKey, weather, city);
            setResponse(result);
        } catch (error) {
            setResponse("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClearKey = () => {
        localStorage.removeItem('gemini_api_key');
        setApiKey('');
        setHasKey(false);
        setResponse(null);
    };

    return (
        <div className="w-full bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-xl mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                    <span className="text-2xl">✨</span> Asistente Gemini
                </h3>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white/70 hover:text-white transition-colors text-sm underline"
                >
                    {isOpen ? 'Ocultar' : 'Mostrar'}
                </button>
            </div>

            {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                    {!hasKey ? (
                        <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                            <p className="text-white/80 text-sm mb-3">
                               
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="password"
                                    placeholder="Pega tu API Key aquí"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/50"
                                />
                                <button
                                    onClick={handleSaveKey}
                                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Guardar
                                </button>
                            </div>
                            <p className="text-xs text-white/40 mt-2">
                                
                            </p>
                        </div>
                    ) : (
                        <div>
                            {!response && !loading && (
                                <div className="text-center py-4">
                                    <p className="text-white/80 mb-4">
                                        ¿Quieres recomendaciones personalizadas para el clima actual en {city}?
                                    </p>
                                    <button
                                        onClick={handleAsk}
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-full font-bold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2 mx-auto"
                                    >
                                        ✨ Dame consejos
                                    </button>
                                    <button onClick={handleClearKey} className="block mx-auto mt-4 text-xs text-white/30 hover:text-white/50">Cambiar API Key</button>
                                </div>
                            )}

                            {loading && (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mb-2"></div>
                                    <p className="text-purple-200 text-sm animate-pulse">Gemini está pensando...</p>
                                </div>
                            )}

                            {response && (
                                <div className="bg-white/10 rounded-xl p-4 border border-white/10 text-white/90 leading-relaxed whitespace-pre-line">
                                    {response}
                                    <button
                                        onClick={handleAsk}
                                        className="mt-4 text-purple-300 hover:text-white text-sm block ml-auto"
                                    >
                                        🔄 Generar de nuevo
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WeatherAI;
