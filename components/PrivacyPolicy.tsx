
import React from 'react';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#0c1219] text-white flex flex-col p-6 animate-in slide-in-from-right duration-500 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center mb-10">
        <button onClick={onClose} className="p-2 -ml-2">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold ml-4">Privacidad y Confidencialidad</h2>
      </div>

      <div className="flex flex-col items-center text-center mb-10">
        <div className="size-20 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
          <span className="material-symbols-outlined text-4xl" style={{fontVariationSettings: "'FILL' 1"}}>shield</span>
        </div>
        <h1 className="text-3xl font-black mb-4">Tu seguridad es prioridad</h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
          Nos comprometemos a proteger tu información personal y médica con los más altos estándares de la industria.
        </p>
      </div>

      {/* Feature List */}
      <div className="space-y-8 flex-1">
        <div className="flex gap-4">
          <div className="size-10 bg-gray-800 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
            <span className="material-symbols-outlined">lock</span>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1">Encriptación de datos</h4>
            <p className="text-xs text-gray-500 leading-normal">Tus datos viajan encriptados de extremo a extremo (E2EE).</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="size-10 bg-gray-800 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
            <span className="material-symbols-outlined">verified_user</span>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1">Documentación segura</h4>
            <p className="text-xs text-gray-500 leading-normal">Compartida solo con profesionales verificados y bajo tu consentimiento.</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="size-10 bg-gray-800 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
            <span className="material-symbols-outlined">gavel</span>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1">Normativa estricta</h4>
            <p className="text-xs text-gray-500 leading-normal">Cumplimiento total con GDPR y normativas internacionales de salud.</p>
          </div>
        </div>
      </div>

      {/* Psychology Box */}
      <div className="bg-[#151f28] rounded-3xl p-6 border border-gray-800 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-8 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-500">
            <span className="material-symbols-outlined text-lg">psychology</span>
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-300">Profesionales de Psicología</h4>
        </div>
        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-blue-500 text-sm">check_circle</span>
            <p className="text-[10px] text-gray-400"><span className="text-white font-bold">Sesiones confidenciales:</span> Todo lo hablado se mantiene estrictamente entre tú y tu especialista.</p>
          </div>
          <div className="flex gap-3">
            <span className="material-symbols-outlined text-orange-500 text-sm">warning</span>
            <p className="text-[10px] text-gray-400"><span className="text-white font-bold">Aviso importante:</span> Este servicio no sustituye la atención médica de urgencias ni crisis inmediatas.</p>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <button 
        onClick={onClose}
        className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
      >
        Entendido
      </button>
    </div>
  );
};
