
import React from 'react';

export const AthleteDashboard: React.FC = () => {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-background-dark min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Header Metrics */}
      <div className="p-6 bg-white dark:bg-gray-800/40 rounded-b-[3rem] shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-black">Hola, Javier</h2>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Objetivo: Maratón Sub-3h</p>
          </div>
          <button className="size-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">search</span>
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {/* Readiness Ring Card */}
            <div className="bg-white dark:bg-gray-800 p-5 rounded-[2.5rem] min-w-[160px] shadow-card flex flex-col items-center border border-primary/10">
                <div className="relative size-20 flex items-center justify-center mb-3">
                    <svg className="size-full -rotate-90">
                        <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" className="text-gray-100 dark:text-gray-700" />
                        <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="226" strokeDashoffset="45" className="text-primary" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-xl font-black italic">88</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase">Readiness</p>
                <p className="text-[10px] text-green-500 font-bold mt-1">↑ +2% vs ayer</p>
            </div>

            {/* Metric Blocks */}
            <div className="flex flex-col gap-3 min-w-[140px]">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-card flex-1 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-sm text-blue-400">bedtime</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Sueño</span>
                    </div>
                    <p className="text-lg font-black italic">7h 42m</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-card flex-1 border border-gray-50 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-sm text-red-400">favorite</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">HRV</span>
                    </div>
                    <p className="text-lg font-black italic">54 ms</p>
                </div>
            </div>
        </div>
      </div>

      {/* Mi Equipo */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black">Mi Equipo</h3>
            <button className="text-primary text-xs font-bold underline">Ver histórico</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
            {[
                { name: 'Dr. Ana Ruiz', role: 'Fisio', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200', active: true },
                { name: 'Carlos M.', role: 'Entrenador', img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200', active: true },
                { name: 'Nutricionista', role: 'Añadir +', isPlaceholder: true },
                { name: 'Psicólogo', role: 'Añadir +', isPlaceholder: true }
            ].map((p, i) => p.isPlaceholder ? (
                <div key={i} className="bg-gray-100 dark:bg-gray-800/50 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-[2rem] p-6 flex flex-col items-center justify-center gap-2 opacity-60">
                    <div className="size-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-gray-400">
                        <span className="material-symbols-outlined">{i === 2 ? 'restaurant' : 'psychology'}</span>
                    </div>
                    <p className="text-[10px] font-black text-gray-500 uppercase">{p.name}</p>
                    <p className="text-[10px] text-primary font-bold">{p.role}</p>
                </div>
            ) : (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-5 shadow-card border border-gray-50 dark:border-gray-700 text-center relative">
                    <div className="relative inline-block mb-3">
                        <img src={p.img} className="size-16 rounded-full object-cover ring-4 ring-gray-50 dark:ring-gray-700" />
                        <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <h4 className="font-black text-sm mb-0.5">{p.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold mb-4 uppercase tracking-tighter">{p.role}</p>
                    <button className="w-full bg-gray-50 dark:bg-gray-700 py-2 rounded-xl">
                        <span className="material-symbols-outlined text-primary text-xl">chat</span>
                    </button>
                </div>
            ))}
        </div>
      </div>

      {/* Protocolos Rápidos */}
      <div className="px-6 pb-12">
        <h3 className="text-xl font-black mb-4">Protocolos rápidos</h3>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            <div className="bg-[#101922] p-6 rounded-[2.5rem] min-w-[200px] text-white flex flex-col gap-4 relative overflow-hidden group active:scale-95 transition-all">
                <span className="material-symbols-outlined text-orange-400 text-3xl">bolt</span>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Activación</p>
                    <p className="text-lg font-black italic">Precompetición</p>
                </div>
                <div className="absolute -right-4 -bottom-4 size-20 bg-orange-400/10 rounded-full blur-2xl"></div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] min-w-[200px] flex flex-col gap-4 border border-gray-100 dark:border-gray-700 shadow-sm active:scale-95 transition-all">
                <span className="material-symbols-outlined text-blue-500 text-3xl">battery_charging_full</span>
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Descanso</p>
                    <p className="text-lg font-black italic">Recuperación</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
