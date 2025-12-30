
import React from 'react';
import { Professional } from '../types';

interface CardProps {
  professional: Professional;
  onSelect: (p: Professional) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export const VerticalCard: React.FC<CardProps> = ({ professional, onSelect, isFavorite, onToggleFavorite }) => {
  return (
    <div className="snap-start shrink-0 w-[200px] flex flex-col gap-3 group cursor-pointer" onClick={() => onSelect(professional)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-card">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105" 
          style={{ backgroundImage: `url("${professional.imageUrl}")` }}
        />
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(professional.id); }}
          className={`absolute top-3 right-3 flex size-8 items-center justify-center rounded-full backdrop-blur-sm shadow-sm transition-colors ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'}`}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "" }}>favorite</span>
        </button>
        {professional.isTrending && (
          <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent">
            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white text-black">TOP VENTA</span>
          </div>
        )}
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <p className="text-[#111318] dark:text-white text-base font-semibold truncate">{professional.name}</p>
          <div className="flex items-center gap-0.5">
            <span className="material-symbols-outlined text-yellow-400 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-xs font-medium text-gray-500">{professional.rating}</span>
          </div>
        </div>
        <p className="text-primary text-sm font-bold">{professional.price}€ {professional.category !== 'Equipamiento' && <span className="text-gray-400 font-normal text-xs">/ sesión</span>}</p>
      </div>
    </div>
  );
};

export const HorizontalCard: React.FC<CardProps> = ({ professional, onSelect }) => {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-card gap-4 items-center cursor-pointer hover:shadow-md transition-shadow" onClick={() => onSelect(professional)}>
      <div className="relative size-24 shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <div className="absolute inset-0 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url("${professional.imageUrl}")` }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-1 ${
            professional.category === 'Recuperación' ? 'text-orange-600 bg-orange-100' : 
            professional.category === 'Nutrición' ? 'text-green-600 bg-green-100' : 'text-primary bg-primary/10'
          }`}>
            {professional.category}
          </span>
        </div>
        <h4 className="text-[#111318] dark:text-white font-semibold text-base mb-1 truncate">{professional.name}</h4>
        <p className="text-gray-500 text-xs mb-2 line-clamp-1">{professional.specialty}</p>
        <div className="flex items-center justify-between">
          <p className="text-[#111318] dark:text-white font-bold">{professional.price}€</p>
          <button className="size-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[18px]">add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
