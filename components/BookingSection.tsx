
import React, { useState } from 'react';
import { Professional } from '../types';

interface BookingSectionProps {
  professional: Professional;
  onClose: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ professional, onClose }) => {
  const [modality, setModality] = useState<'online' | 'presencial'>('online');
  const [method, setMethod] = useState<'meet' | 'zoom' | 'teams' | 'facetime'>('meet');
  const [duration, setDuration] = useState(60);
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('11:30');

  const days = [
    { label: 'LUN', num: 14 },
    { label: 'MAR', num: 15 },
    { label: 'MIÉ', num: 16 },
    { label: 'JUE', num: 17 },
    { label: 'VIE', num: 18 }
  ];

  const times = ['09:00', '10:00', '11:30', '14:00', '16:30', '18:00'];
  
  const durations = [
    { mins: 45, price: 50 },
    { mins: 60, price: 70, popular: true },
    { mins: 90, price: 100 }
  ];

  const totalPrice = durations.find(d => d.mins === duration)?.price || 0;

  return (
    <div className="fixed inset-0 z-[70] bg-white dark:bg-background-dark flex flex-col animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-900 dark:text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-black">Reserva de Sesión</h2>
        <div className="w-8"></div>
      </div>

      {/* Prof Info Mini Card */}
      <div className="px-6 mb-8">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-4 flex items-center gap-4 border border-gray-100 dark:border-gray-700">
            <img src={professional.imageUrl} className="size-16 rounded-2xl object-cover ring-2 ring-white" />
            <div className="flex-1">
                <div className="flex items-center gap-1">
                    <h3 className="font-black text-sm">{professional.name}</h3>
                    <span className="material-symbols-outlined text-primary text-sm font-fill">verified</span>
                </div>
                <p className="text-[10px] text-gray-500 font-bold">{professional.specialty}</p>
            </div>
            <button className="size-10 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary shadow-sm">
                <span className="material-symbols-outlined text-xl">info</span>
            </button>
        </div>
      </div>

      <div className="px-6 space-y-8">
        {/* Modality */}
        <section>
            <h4 className="text-sm font-black mb-4">Modalidad</h4>
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                <button 
                    onClick={() => setModality('presencial')}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${modality === 'presencial' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-400'}`}
                >
                    <span className="material-symbols-outlined text-sm align-middle mr-1">location_on</span> Presencial
                </button>
                <button 
                    onClick={() => setModality('online')}
                    className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${modality === 'online' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-400'}`}
                >
                    <span className="material-symbols-outlined text-sm align-middle mr-1">videocam</span> Online
                </button>
            </div>
        </section>

        {/* Online Methods if Online */}
        {modality === 'online' && (
            <section className="animate-in fade-in duration-300">
                <h4 className="text-sm font-black mb-4">Método de videollamada</h4>
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { id: 'meet', icon: 'videocam', label: 'Google Meet' },
                        { id: 'zoom', icon: 'groups', label: 'Zoom' },
                        { id: 'teams', icon: 'business_center', label: 'Teams' },
                        { id: 'facetime', icon: 'video_chat', label: 'FaceTime' }
                    ].map(m => (
                        <button 
                            key={m.id}
                            onClick={() => setMethod(m.id as any)}
                            className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${method === m.id ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800'}`}
                        >
                            <span className={`material-symbols-outlined ${method === m.id ? 'text-primary' : 'text-gray-400'}`}>{m.icon}</span>
                            <span className={`text-[10px] font-black ${method === m.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{m.label}</span>
                        </button>
                    ))}
                </div>
            </section>
        )}

        {/* Date Selection */}
        <section>
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-black">Octubre 2023</h4>
                <button className="text-primary text-[10px] font-black underline">Ver calendario</button>
            </div>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {days.map(d => (
                    <button 
                        key={d.num}
                        onClick={() => setSelectedDay(d.num)}
                        className={`flex flex-col items-center justify-center min-w-[64px] py-4 rounded-2xl transition-all ${selectedDay === d.num ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700'}`}
                    >
                        <span className={`text-[10px] font-black mb-1 ${selectedDay === d.num ? 'text-white/80' : 'text-gray-400'}`}>{d.label}</span>
                        <span className="text-xl font-black">{d.num}</span>
                    </button>
                ))}
            </div>
        </section>

        {/* Time Selection */}
        <section>
            <h4 className="text-sm font-black mb-4">Horario disponible</h4>
            <div className="grid grid-cols-3 gap-3">
                {times.map(t => (
                    <button 
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-3 rounded-2xl text-xs font-black transition-all ${selectedTime === t ? 'bg-primary text-white shadow-md' : 'bg-gray-50 dark:bg-gray-800 text-gray-400 border border-gray-100 dark:border-gray-700'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </section>

        {/* Duration Selection */}
        <section>
            <h4 className="text-sm font-black mb-4">Duración</h4>
            <div className="grid grid-cols-3 gap-3">
                {durations.map(d => (
                    <button 
                        key={d.mins}
                        onClick={() => setDuration(d.mins)}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all relative ${duration === d.mins ? 'border-primary bg-primary/5' : 'border-gray-100 dark:border-gray-800'}`}
                    >
                        {d.popular && <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full">POPULAR</span>}
                        <span className={`text-[10px] font-black ${duration === d.mins ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>{d.mins} min</span>
                        <span className={`text-[10px] ${duration === d.mins ? 'text-primary font-bold' : 'text-gray-400'}`}>{d.price}€</span>
                    </button>
                ))}
            </div>
        </section>
      </div>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md p-6 border-t border-gray-100 dark:border-gray-800 z-[80]">
        <div className="max-w-md mx-auto">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total a pagar</p>
                    <p className="text-2xl font-black">{totalPrice.toFixed(2)} €</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black text-gray-900 dark:text-white">Sesión Standard</p>
                    <p className="text-[10px] text-gray-400">{duration} min • {modality === 'online' ? 'Online' : 'Presencial'}</p>
                </div>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
                Confirmar y reservar <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
        </div>
      </div>
    </div>
  );
};
