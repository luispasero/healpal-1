
import React, { useState } from 'react';

export const VaultSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Entrenos');
  const [timeFilter, setTimeFilter] = useState('Semana');

  const categories = ['Dietas', 'Entrenos', 'Informes', 'Rehab'];
  const timeFilters = ['Semana', 'Mesociclo', 'Pretemporada'];

  const docs = [
    { title: 'Hipertrofia - Semana 4', pro: 'Coach Marcos', cat: 'Entrenos', sub: 'Rendimiento', status: 'NUEVO', date: 'Ayer', icon: 'fitness_center', color: 'bg-green-500' },
    { title: 'Plan Nutricional Fase 2', pro: 'Dr. García', cat: 'Dietas', sub: 'Nutrición', status: 'ACTUALIZADO', date: '12 Oct 2023', icon: 'restaurant', color: 'bg-orange-500' },
    { title: 'Resonancia Magnética', pro: 'Clínica Sanitas', cat: 'Informes', sub: 'Lesión', status: 'ARCHIVADO', date: '15 Mayo 2023', icon: 'health_and_safety', color: 'bg-purple-500' },
    { title: 'Análisis de Técnica', pro: 'Biomecánica', cat: 'Entrenos', sub: 'Técnica', status: 'VISTO', date: '10 Mayo 2023', icon: 'videocam', color: 'bg-blue-500' }
  ];

  return (
    <div className="flex flex-col bg-gray-50 dark:bg-background-dark min-h-screen pb-24 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-background-dark pt-4 px-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between mb-6">
            <button className="p-2 -ml-2"><span className="material-symbols-outlined">arrow_back</span></button>
            <h2 className="text-xl font-black">Mi Bóveda</h2>
            <button className="p-2 -mr-2"><span className="material-symbols-outlined">search</span></button>
        </div>
        
        {/* Categories Tabs */}
        <div className="flex gap-8 overflow-x-auto hide-scrollbar mb-4">
            {categories.map(cat => (
                <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`pb-3 text-sm font-black transition-all relative whitespace-nowrap ${activeCategory === cat ? 'text-primary' : 'text-gray-400'}`}
                >
                    {cat}
                    {activeCategory === cat && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                </button>
            ))}
        </div>
      </div>

      {/* Sub-filters (Time) */}
      <div className="px-6 py-4 flex gap-3 overflow-x-auto hide-scrollbar">
        {timeFilters.map(f => (
            <button 
                key={f}
                onClick={() => setTimeFilter(f)}
                className={`h-9 px-6 rounded-2xl text-xs font-black transition-all ${timeFilter === f ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-400'}`}
            >
                {f}
            </button>
        ))}
      </div>

      {/* Doc List */}
      <div className="px-6 space-y-6">
        <div className="flex justify-between items-center mt-4">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Recientes</h3>
            <button className="text-primary text-[10px] font-black">Ver todos</button>
        </div>

        {docs.filter(d => activeCategory === 'Informes' ? true : d.cat === activeCategory).map((doc, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-[2.5rem] shadow-sm border border-gray-50 dark:border-gray-700 flex gap-4 items-center group active:scale-[0.98] transition-all">
                <div className={`size-14 rounded-2xl ${doc.color} text-white flex items-center justify-center shrink-0 shadow-lg`}>
                    <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${doc.status === 'NUEVO' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-primary'}`}>{doc.status}</span>
                        <p className="text-[9px] text-gray-400 font-bold uppercase truncate">{doc.date}</p>
                    </div>
                    <h4 className="font-black text-sm truncate mb-0.5">{doc.title}</h4>
                    <p className="text-[10px] text-gray-500 font-bold">Por {doc.pro} • {doc.sub}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="size-8 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl">download</span>
                    </button>
                </div>
            </div>
        ))}
      </div>

      {/* Floating Upload */}
      <button className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-primary text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl z-50 active:scale-95 transition-transform">
        <span className="material-symbols-outlined">upload_file</span>
        <span className="text-xs font-black tracking-widest uppercase">Subir archivo</span>
      </button>
    </div>
  );
};
