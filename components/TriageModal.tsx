
import React, { useState } from 'react';
import { TriageData, AIRecommendation } from '../types';
import { getTriageRecommendation } from '../services/geminiService';

interface TriageModalProps {
  onClose: () => void;
  onResult: (result: AIRecommendation) => void;
}

export const TriageModal: React.FC<TriageModalProps> = ({ onClose, onResult }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TriageData>({
    objective: '',
    discomfort: '',
    location: 'Madrid',
    modality: 'ambos',
    availability: 'Tardes'
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await getTriageRecommendation(formData);
      onResult(result);
    } catch (error) {
      console.error(error);
      alert("Error en el diagnóstico IA. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="p-8 pt-10">
          <div className="mb-6">
            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1 flex-grow rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-gray-100'}`} />
              ))}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">Configura tu equipo de rendimiento</h2>
          </div>

          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">¿Cuál es tu meta?</label>
                <textarea 
                  className="w-full rounded-2xl border-none bg-background-light dark:bg-gray-700 p-4 text-sm focus:ring-2 focus:ring-primary h-32"
                  placeholder="Ej: Correr mi primera maratón o recuperarme de una lesión..."
                  value={formData.objective}
                  onChange={(e) => setFormData({...formData, objective: e.target.value})}
                />
              </div>
              <button 
                disabled={!formData.objective}
                onClick={() => setStep(2)}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:opacity-90 disabled:opacity-50 transition-all"
              >
                Siguiente
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">¿Molestias actuales?</label>
                <textarea 
                  className="w-full rounded-2xl border-none bg-background-light dark:bg-gray-700 p-4 text-sm focus:ring-2 focus:ring-primary h-32"
                  placeholder="Ej: Dolor lumbar al entrenar pierna..."
                  value={formData.discomfort}
                  onChange={(e) => setFormData({...formData, discomfort: e.target.value})}
                />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="w-1/3 bg-gray-100 dark:bg-gray-700 py-4 rounded-2xl font-bold text-gray-600 dark:text-white">Atrás</button>
                <button 
                  disabled={!formData.discomfort}
                  onClick={() => setStep(3)}
                  className="w-2/3 bg-primary text-white py-4 rounded-2xl font-bold"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Ciudad</label>
                  <input className="w-full rounded-xl border-none bg-background-light dark:bg-gray-700 p-3 text-xs" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Tipo</label>
                  <select className="w-full rounded-xl border-none bg-background-light dark:bg-gray-700 p-3 text-xs" value={formData.modality} onChange={(e) => setFormData({...formData, modality: e.target.value as any})}>
                    <option value="presencial">Presencial</option>
                    <option value="online">Online</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                {loading ? <span className="animate-spin material-symbols-outlined">progress_activity</span> : "Obtener mi equipo IA"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
