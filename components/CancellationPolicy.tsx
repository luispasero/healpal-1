
import React from 'react';

interface CancellationPolicyProps {
  onClose: () => void;
}

export const CancellationPolicy: React.FC<CancellationPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0c1219] text-white flex flex-col p-6 animate-in slide-in-from-bottom duration-500 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-8"></div>
        <h2 className="text-xl font-bold">Política de Cancelación</h2>
        <button onClick={onClose} className="p-2 text-gray-400">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <p className="text-gray-400 text-sm mb-6">Aplicable a tu sesión con:</p>
      
      {/* Profile Info */}
      <div className="bg-[#151f28] rounded-2xl p-4 flex items-center gap-4 mb-8">
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100" className="size-14 rounded-full border-2 border-gray-700" />
          <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-[#151f28]"></div>
        </div>
        <div>
          <h3 className="font-bold text-lg">Dr. Alex Rivera</h3>
          <div className="flex items-center gap-2">
            <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded">Fisioterapeuta</span>
            <span className="text-gray-500 text-[10px]">• Sesión Online</span>
          </div>
        </div>
      </div>

      {/* Policy Cards */}
      <div className="space-y-4 flex-1">
        <div className="bg-[#151f28] p-5 rounded-2xl border-l-4 border-green-500 flex gap-4">
          <div className="size-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
          </div>
          <div>
            <h4 className="font-bold mb-1">Cancelación gratuita</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Hasta 24h antes. Sin coste alguno, puedes reprogramar la sesión cuando quieras.</p>
          </div>
        </div>

        <div className="bg-[#151f28] p-5 rounded-2xl border-l-4 border-orange-500 flex gap-4">
          <div className="size-10 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-500 shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>warning</span>
          </div>
          <div>
            <h4 className="font-bold mb-1">Cancelación tardía</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Menos de 24h. Se cobrará el <span className="text-orange-400 font-bold">50% de la sesión</span> para compensar el tiempo reservado.</p>
          </div>
        </div>

        <div className="bg-[#151f28] p-5 rounded-2xl border-l-4 border-red-500 flex gap-4">
          <div className="size-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 shrink-0">
            <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>cancel</span>
          </div>
          <div>
            <h4 className="font-bold mb-1">No show (No presentado)</h4>
            <p className="text-xs text-gray-400 leading-relaxed">Sin aviso previo. Se cobrará el <span className="text-red-400 font-bold">100% de la sesión</span> si no te presentas a la hora acordada.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 space-y-6">
        <button className="w-full flex justify-center items-center gap-2 text-primary text-xs font-bold">
          Ver detalles completos <span className="material-symbols-outlined text-sm">open_in_new</span>
        </button>
        <button 
          onClick={onClose}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};
