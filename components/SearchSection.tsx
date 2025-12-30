
import React from 'react';
import { Professional } from '../types';

interface SearchSectionProps {
  onSelectProfessional: (p: Professional) => void;
  professionals: Professional[];
}

export const SearchSection: React.FC<SearchSectionProps> = ({ onSelectProfessional, professionals }) => {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-background-dark min-h-screen pb-24 animate-in fade-in duration-300">
      {/* Header Filters */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md pb-4">
        <div className="flex items-center gap-2 p-4 pt-2">
            <button className="h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">Más cerca</button>
            <button className="h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold shadow-sm whitespace-nowrap">Mejor valorados</button>
            <button className="h-10 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-bold shadow-sm whitespace-nowrap flex items-center gap-1">Precio <span className="material-symbols-outlined text-sm">expand_more</span></button>
        </div>
        <div className="px-4 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{professionals.length} profesionales encontrados</p>
            <button className="flex items-center gap-1 text-primary text-[10px] font-bold">
                <span className="material-symbols-outlined text-sm">sort</span> RELEVANCIA
            </button>
        </div>
      </div>

      {/* Results List */}
      <div className="p-4 space-y-4">
        {professionals.map(p => (
          <div 
            key={p.id} 
            onClick={() => onSelectProfessional(p)}
            className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-card border border-gray-50 dark:border-gray-700 active:scale-[0.98] transition-all"
          >
            <div className="flex gap-4 mb-6">
              <div className="relative">
                <img src={p.imageUrl} className="size-20 rounded-3xl object-cover ring-4 ring-gray-50 dark:ring-gray-700/50" />
                <div className="absolute -bottom-1 -right-1 size-6 bg-primary rounded-lg border-2 border-white flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[14px] font-bold">verified</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h3 className="font-black text-lg truncate">{p.name}</h3>
                    <div className="flex items-center gap-0.5 bg-yellow-50 px-2 py-0.5 rounded-lg">
                        <span className="material-symbols-outlined text-yellow-500 text-sm font-fill">star</span>
                        <span className="text-[10px] font-black text-yellow-700">{p.rating}</span>
                        <span className="text-[9px] text-gray-400">({p.reviews})</span>
                    </div>
                </div>
                <p className="text-primary text-xs font-bold mb-3">{p.specialty}</p>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <span className="material-symbols-outlined text-xs text-green-500">event_available</span> Prox: Hoy 16:30
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        <span className="material-symbols-outlined text-xs text-blue-500">schedule</span> Resp: 1h
                    </div>
                </div>
              </div>
            </div>

            {/* Session Packs Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-2xl text-center border border-transparent">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Sesión 60'</p>
                    <p className="text-lg font-black">{p.price}€</p>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-3 rounded-2xl text-center border border-primary/20 relative">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">POPULAR</div>
                    <p className="text-[9px] font-bold text-primary uppercase mb-1">Pack 4</p>
                    <p className="text-lg font-black text-primary">220€</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-2xl text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Pack 8</p>
                    <p className="text-lg font-black">400€</p>
                </div>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-primary/20">Ver Perfil Completo</button>
          </div>
        ))}
      </div>

      {/* Floating Map Button */}
      <button className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full flex items-center gap-2 shadow-2xl z-40 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">map</span>
        <span className="text-xs font-black tracking-widest uppercase">Ver Mapa</span>
      </button>
    </div>
  );
};
