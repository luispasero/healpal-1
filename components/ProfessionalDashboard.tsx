
import React from 'react';

export const ProfessionalDashboard: React.FC<{ onShowMessages: () => void }> = ({ onShowMessages }) => {
  return (
    <div className="flex flex-col bg-gray-50 dark:bg-background-dark min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Header Info */}
      <div className="p-6 bg-white dark:bg-gray-800/40 rounded-b-[3rem] shadow-sm mb-6">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
                <div className="relative">
                    <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100" className="size-12 rounded-full object-cover border-2 border-white" />
                    <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Bienvenido de nuevo</p>
                    <h2 className="text-xl font-black">Dr. Alberto Martín</h2>
                </div>
            </div>
            <button className="size-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined">notifications</span>
            </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
            <button className="flex-1 bg-primary text-white py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-sm">add_circle</span> Crear hueco
            </button>
            <button className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border border-gray-100 dark:border-gray-700 shadow-sm">
                <span className="material-symbols-outlined text-sm">block</span> Bloquear fecha
            </button>
        </div>

        {/* Monthly Summary Cards */}
        <h3 className="text-sm font-black mb-3 px-2">Resumen mensual</h3>
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl min-w-[140px] shadow-sm border border-gray-50 dark:border-gray-700">
                <div className="flex justify-between mb-3">
                    <div className="size-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-500">
                        <span className="material-symbols-outlined text-sm">payments</span>
                    </div>
                    <span className="text-[10px] font-black text-green-500">↑ 12%</span>
                </div>
                <p className="text-xl font-black">1.250€</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">Ingresos totales</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-3xl min-w-[140px] shadow-sm border border-gray-50 dark:border-gray-700">
                <div className="flex justify-between mb-3">
                    <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                    </div>
                </div>
                <p className="text-xl font-black">14</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase">Citas esta semana</p>
            </div>
        </div>
      </div>

      {/* Solicitudes */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
            <h3 className="text-lg font-black">Solicitudes</h3>
            <span className="bg-red-500 text-white text-[10px] font-black size-5 rounded-full flex items-center justify-center">2</span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-[2rem] shadow-card border border-gray-50 dark:border-gray-700">
            <div className="flex gap-4 mb-4">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" className="size-14 rounded-2xl object-cover" />
                <div className="flex-1">
                    <div className="flex justify-between">
                        <h4 className="font-bold text-sm">María González</h4>
                        <span className="text-[8px] font-black bg-blue-50 text-primary px-2 py-0.5 rounded-full tracking-widest uppercase">Nueva</span>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold mb-1">Consulta Fisioterapia</p>
                    <p className="text-[10px] text-gray-500"><span className="material-symbols-outlined text-xs align-middle mr-1">schedule</span> Hoy, 18:30 - 19:30</p>
                </div>
            </div>
            <div className="flex gap-2">
                <button className="flex-1 bg-gray-50 dark:bg-gray-700 py-3 rounded-xl text-[10px] font-black text-gray-500 uppercase tracking-widest">Rechazar</button>
                <button className="flex-1 bg-primary text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest">Aceptar</button>
            </div>
        </div>
      </div>

      {/* Agenda Section */}
      <div className="px-6 pb-12">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-black">Agenda de hoy</h3>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mar, 24 Oct</p>
        </div>
        <div className="space-y-4 relative before:absolute before:left-2 before:top-2 before:bottom-0 before:w-[1px] before:bg-gray-200">
            {[
                { time: '09:00 AM', label: 'Masaje Deportivo', client: 'Carlos Ruiz', status: 'completada' },
                { time: '12:30 PM', label: 'Primera Consulta', client: 'Ana García', status: 'proxima', active: true },
                { time: '16:00 PM', label: 'Revisión Mensual', client: 'Gym Center Norte', status: 'pendiente' }
            ].map((ev, i) => (
                <div key={i} className="flex gap-6 relative">
                    <div className={`size-4 rounded-full border-2 border-white z-10 -ml-[7px] mt-1 ${ev.active ? 'bg-primary ring-4 ring-primary/20 scale-125' : 'bg-gray-300'}`}></div>
                    <div className="flex-1">
                        <p className={`text-[10px] font-black mb-2 ${ev.active ? 'text-primary' : 'text-gray-400'}`}>{ev.time} {ev.status === 'proxima' && '(Próxima)'}</p>
                        <div className={`p-5 rounded-[2.5rem] ${ev.active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'}`}>
                            <h4 className="font-black text-sm mb-1">{ev.label}</h4>
                            <p className={`text-[10px] font-bold ${ev.active ? 'text-white/80' : 'text-gray-400'}`}>{ev.client} • {ev.status}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Floating Action Menu */}
      <button className="fixed bottom-24 right-6 size-16 bg-gray-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-gray-900 shadow-2xl z-[60] active:scale-95 transition-transform">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Action shortcuts as per screenshot */}
      <div className="px-6 mb-12">
        <h3 className="text-lg font-black mb-4">Acciones rápidas</h3>
        <div className="flex flex-col gap-3">
            <button className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700 text-left active:scale-[0.98] transition-all">
                <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">description</span>
                </div>
                <div className="flex-1">
                    <p className="font-black text-sm">Crear informe clínico</p>
                </div>
                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
            <button className="flex items-center gap-4 bg-white dark:bg-gray-800 p-5 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-700 text-left active:scale-[0.98] transition-all">
                <div className="size-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500">
                    <span className="material-symbols-outlined">send</span>
                </div>
                <div className="flex-1">
                    <p className="font-black text-sm">Enviar documento</p>
                </div>
                <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </button>
        </div>
      </div>
    </div>
  );
};
