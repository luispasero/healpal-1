
import React from 'react';

export const MessagesSection: React.FC = () => {
  const chats = [
    { name: 'Dr. Ana Ruiz', role: 'PSICÓLOGO', lastMsg: 'Recuerda completar el diario de...', time: '10:30', unread: 2, online: true, img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' },
    { name: 'Carlos Ruiz', role: 'FISIO', lastMsg: 'La sesión de hoy fue excelente. Te dej...', time: 'Ayer', online: false, nextCita: 'Jue 14:00', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
    { name: 'Sofia Marti', role: 'NUTRI', lastMsg: '¿Cómo vas con el plan de hidratación?', time: 'Mar', online: true, img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200' },
    { name: 'Jorge P.', role: 'ENTRENADOR', lastMsg: 'Buen trabajo con los intervalos de ay...', time: 'Lun', online: false, img: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200' },
    { name: 'Soporte Headpal', role: 'ADMIN', lastMsg: 'Tu suscripción premium ha sido renov...', time: '10 Feb', online: true, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200' }
  ];

  return (
    <div className="flex flex-col bg-white dark:bg-background-dark min-h-screen pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 pb-2 flex justify-between items-center">
        <h2 className="text-2xl font-black italic">Mensajes</h2>
        <button className="size-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-gray-900 dark:text-white">edit_square</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-6 mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 h-12 rounded-2xl flex items-center px-4 gap-3">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input className="bg-transparent border-none w-full text-sm font-medium focus:ring-0" placeholder="Buscar conversaciones..." />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 flex gap-3 mb-6 overflow-x-auto hide-scrollbar">
        {['Todos', 'Mi equipo', 'Solicitudes'].map((tab, i) => (
          <button key={i} className={`h-9 px-6 rounded-full text-xs font-black whitespace-nowrap transition-all ${i === 0 ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gray-50 dark:bg-gray-800 text-gray-400'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <div className="flex flex-col px-4">
        {chats.map((chat, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-[2rem] active:bg-gray-50 dark:active:bg-gray-800 transition-all group">
            <div className="relative">
              <img src={chat.img} className="size-14 rounded-full object-cover ring-2 ring-gray-100 dark:ring-gray-700" />
              {chat.online && <div className="absolute bottom-0 right-0 size-4 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-sm">{chat.name}</h4>
                  <span className="text-[8px] font-black bg-blue-50 text-primary px-1.5 py-0.5 rounded uppercase">{chat.role}</span>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate pr-4">{chat.lastMsg}</p>
              {chat.nextCita && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-lg">
                  <span className="material-symbols-outlined text-[10px] text-primary">calendar_today</span>
                  <span className="text-[9px] font-black text-primary uppercase">Prox: {chat.nextCita}</span>
                </div>
              )}
            </div>
            {chat.unread && (
              <div className="size-5 bg-primary text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg">
                {chat.unread}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
