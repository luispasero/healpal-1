
import React from 'react';
import { Category, Professional, AIRecommendation } from '../types';
import { VerticalCard, HorizontalCard } from './ProfessionalCard';

interface HomeSectionProps {
  selectedCategory: Category | 'Todos';
  setSelectedCategory: (cat: Category | 'Todos') => void;
  categories: { name: Category; icon: string }[];
  recommendation: AIRecommendation | null;
  setRecommendation: (rec: AIRecommendation | null) => void;
  filteredProfessionals: Professional[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
  setSelectedProfessional: (p: Professional) => void;
  onGoToPlanes: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  recommendation,
  setRecommendation,
  filteredProfessionals,
  favorites,
  toggleFavorite,
  setSelectedProfessional,
  onGoToPlanes,
}) => {
  return (
    <main className="flex flex-col gap-6 py-2">
      {/* Banner para Profesionales (Opcional/Acceso rápido) */}
      <div className="px-4">
        <button 
          onClick={onGoToPlanes}
          className="w-full bg-white dark:bg-gray-800 border border-primary/20 p-3 rounded-2xl flex items-center justify-between shadow-sm active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-primary uppercase tracking-wider">¿Eres profesional?</p>
              <p className="text-[10px] text-gray-500">Únete a la red elite de Headpal</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-400">chevron_right</span>
        </button>
      </div>

      {/* Categories Chips */}
      <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar pb-1">
        <button 
          onClick={() => setSelectedCategory('Todos')}
          className={`flex h-9 shrink-0 items-center justify-center px-5 rounded-full transition-all ${selectedCategory === 'Todos' ? 'bg-[#111318] dark:bg-white text-white dark:text-[#111318] shadow-lg' : 'bg-white dark:bg-gray-800 text-[#111318] dark:text-gray-200 shadow-card border border-transparent'}`}
        >
          <p className="text-sm font-medium">Todo</p>
        </button>
        {categories.map(cat => (
          <button 
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all ${selectedCategory === cat.name ? 'bg-[#111318] dark:bg-white text-white dark:text-[#111318] shadow-lg' : 'bg-white dark:bg-gray-800 text-[#111318] dark:text-gray-200 shadow-card border border-transparent hover:border-gray-200'}`}
          >
            <span className="material-symbols-outlined text-primary text-[18px]">{cat.icon}</span>
            <p className="text-sm font-medium">{cat.name}</p>
          </button>
        ))}
      </div>

      {/* IA Recommendation active alert */}
      {recommendation && (
        <div className="mx-4 bg-primary rounded-2xl p-4 text-white shadow-lg relative overflow-hidden animate-in zoom-in duration-300">
           <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                 <h4 className="text-sm font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                    Plan IA Recomendado
                 </h4>
                 <button onClick={() => setRecommendation(null)} className="text-[10px] bg-white/20 px-2 py-0.5 rounded uppercase font-bold">Quitar</button>
              </div>
              <p className="text-xs opacity-90 leading-snug">{recommendation.reason}</p>
           </div>
           <div className="absolute -right-4 -top-4 size-20 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      )}

      {/* Section Para ti */}
      <section>
        <div className="flex items-center justify-between px-4 pb-3">
          <h3 className="text-[#111318] dark:text-white text-xl font-bold leading-tight">Para ti</h3>
          <button className="text-primary text-sm font-medium hover:opacity-80">Ver todo</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar px-4 pb-4 gap-4 snap-x">
          {filteredProfessionals.map(p => (
            <VerticalCard 
              key={p.id} 
              professional={p} 
              onSelect={setSelectedProfessional} 
              isFavorite={favorites.includes(p.id)} 
              onToggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      </section>

      {/* Section Popular */}
      <section className="px-4">
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-[#111318] dark:text-white text-xl font-bold leading-tight">Lo más popular</h3>
        </div>
        <div className="flex flex-col gap-4">
          {filteredProfessionals.filter(p => p.isTrending).map(p => (
            <HorizontalCard 
              key={p.id} 
              professional={p} 
              onSelect={setSelectedProfessional} 
              isFavorite={favorites.includes(p.id)} 
              onToggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      </section>
    </main>
  );
};
