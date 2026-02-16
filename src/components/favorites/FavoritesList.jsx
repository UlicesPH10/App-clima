import React from 'react';

const FavoritesList = ({ onClose, onSelect, favorites = [] }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            {}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-xl">Mis Ciudades ({favorites.length})</h3>
                    <button onClick={onClose} className="text-white/70 hover:text-white bg-white/10 rounded-full p-2 transition-colors">
                        ✕
                    </button>
                </div>

                <div className="space-y-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
                    {favorites.length === 0 ? (
                        <p className="text-white/60 text-center py-8">No tienes ciudades guardadas aún.</p>
                    ) : (
                        favorites.map((fav, index) => (
                            <div
                                key={index}
                                onClick={() => { onSelect(fav); onClose(); }}
                                className="bg-gradient-to-r from-white/10 to-transparent hover:from-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/10 transition-all cursor-pointer group transform hover:scale-102"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-3xl filter drop-shadow-md">{fav.icon}</span>
                                    <div className="text-left">
                                        <span className="font-bold text-white text-lg block leading-tight">{fav.city.split(',')[0]}</span>
                                        <span className="text-xs text-white/60 block">{fav.city.split(',').slice(1).join(',')}</span>
                                    </div>
                                </div>
                                <span className="font-light text-white/90 text-2xl">{fav.temp}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FavoritesList;
