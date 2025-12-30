
import React, { useState, useMemo, useEffect } from 'react';
import { PROFESSIONALS, CATEGORIES } from './constants';
import { Category, Professional, AIRecommendation } from './types';
import { TriageModal } from './components/TriageModal';
import { PricingSection } from './components/PricingSection';
import { SearchSection } from './components/SearchSection';
import { BookingSection } from './components/BookingSection';
import { ProfessionalDashboard } from './components/ProfessionalDashboard';
import { AthleteDashboard } from './components/AthleteDashboard';
import { VaultSection } from './components/VaultSection';
import { MessagesSection } from './components/MessagesSection';
import { CancellationPolicy } from './components/CancellationPolicy';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { HorizontalCard } from './components/ProfessionalCard';

const App: React.FC = () => {
  const [role, setRole] = useState<'athlete' | 'professional'>('athlete');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isTriageOpen, setIsTriageOpen] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'equipo' | 'docs' | 'perfil' | 'planes' | 'mensajes'>('inicio');
  const [showCancellation, setShowCancellation] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Almacenar el rol para persistencia en Vercel demo
  useEffect(() => {
    const savedRole = localStorage.getItem('headpal_role');
    if (savedRole) setRole(savedRole as any);
  }, []);

  useEffect(() => {
    localStorage.setItem('headpal_role', role);
  }, [role]);

  const filteredProfessionals = useMemo(() => {
    return PROFESSIONALS.filter(p => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRecommendation = recommendation ? recommendation.priority.includes(p.category) : true;
      return matchesCategory && matchesSearch && matchesRecommendation;
    });
  }, [selectedCategory, searchQuery, recommendation]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const handleSelectProfessional = (p: Professional) => {
    setSelectedProfessional(p);
  };

  const renderContent = () => {
    if (role === 'professional') {
        return <ProfessionalDashboard onShowMessages={() => setActiveTab('mensajes')} />;
    }

    switch (activeTab) {
      case 'inicio':
        return <AthleteDashboard />;
      case 'buscar':
        return <SearchSection professionals={filteredProfessionals} onSelectProfessional={handleSelectProfessional} />;
      case 'mensajes':
        return <MessagesSection />;
      case 'docs':
        return <VaultSection />;
      case 'perfil':
        return (
          <div className="p-6 flex flex-col gap-6 bg-gray-50 dark:bg-background-dark min-h-screen pb-32">
            <div className="flex items-center gap-5 bg-white dark:bg-gray-800 p-8 rounded-[3rem] shadow-card">
              <div className="size-24 rounded-full bg-cover ring-8 ring-primary/5" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200")'}}></div>
              <div>
                <h4 className="font-black text-2xl italic leading-tight">Camila Silva</h4>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Deportista Amateur</p>
                <button 
                    onClick={() => {
                        setRole(role === 'athlete' ? 'professional' : 'athlete');
                        window.scrollTo(0, 0);
                    }}
                    className="mt-4 bg-primary text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">cached</span>
                    Modo Profesional
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-black text-3xl mb-2 italic">Impulsa tu carrera</h4>
                <p className="text-sm opacity-90 mb-8 leading-relaxed font-medium">Gestiona tu agenda, recibe pagos seguros y destaca ante atletas de élite.</p>
                <button 
                  onClick={() => setActiveTab('planes')}
                  className="bg-white text-primary px-10 py-4 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform"
                >
                  Ver Planes de Crecimiento
                </button>
              </div>
              <div className="absolute -right-20 -bottom-20 size-64 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Política de Cancelación', icon: 'event_busy', action: () => setShowCancellation(true) },
                { label: 'Privacidad y Seguridad', icon: 'shield_lock', action: () => setShowPrivacy(true) },
                { label: 'Diagnóstico IA', icon: 'psychology_alt', action: () => setIsTriageOpen(true) },
                { label: 'Configuración de cuenta', icon: 'settings' },
                { label: 'Cerrar Sesión', icon: 'logout', color: 'text-red-500' }
              ].map((item, i) => (
                <button key={i} onClick={item.action} className={`w-full flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm font-black text-sm ${item.color || ''} transition-all active:scale-[0.98]`}>
                  <div className="size-10 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-400">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className="material-symbols-outlined text-gray-300">chevron_right</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 'planes':
        return <PricingSection onBack={() => setActiveTab('perfil')} />;
      default:
        return <AthleteDashboard />;
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl transition-colors font-display">
      
      {renderContent()}

      {activeTab !== 'planes' && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-md mx-auto flex justify-between items-center px-6 h-20">
            {role === 'athlete' ? (
                <>
                    <button onClick={() => setActiveTab('inicio')} className={`flex flex-col items-center justify-center gap-1.5 w-14 ${activeTab === 'inicio' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'inicio' ? "'FILL' 1" : "" }}>home</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Inicio</span>
                    </button>
                    <button onClick={() => setActiveTab('buscar')} className={`flex flex-col items-center justify-center gap-1.5 w-14 ${activeTab === 'buscar' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'buscar' ? "'FILL' 1" : "" }}>search</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Buscar</span>
                    </button>
                    <button onClick={() => setActiveTab('mensajes')} className={`flex flex-col items-center justify-center gap-1.5 w-14 ${activeTab === 'mensajes' ? 'text-primary' : 'text-gray-400'}`}>
                        <div className="relative">
                            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'mensajes' ? "'FILL' 1" : "" }}>chat</span>
                            <span className="absolute -top-1 -right-1 size-4 bg-primary text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white dark:border-background-dark">2</span>
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Chat</span>
                    </button>
                    <button onClick={() => setActiveTab('docs')} className={`flex flex-col items-center justify-center gap-1.5 w-14 ${activeTab === 'docs' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'docs' ? "'FILL' 1" : "" }}>inventory_2</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Bóveda</span>
                    </button>
                    <button onClick={() => setActiveTab('perfil')} className={`flex flex-col items-center justify-center gap-1.5 w-14 ${activeTab === 'perfil' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: activeTab === 'perfil' ? "'FILL' 1" : "" }}>person</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Perfil</span>
                    </button>
                </>
            ) : (
                <>
                    <button className="flex flex-col items-center justify-center gap-1.5 flex-1 text-primary">
                        <span className="material-symbols-outlined text-[26px]" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Panel</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1.5 flex-1 text-gray-400">
                        <span className="material-symbols-outlined text-[26px]">calendar_month</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Agenda</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1.5 flex-1 text-gray-400">
                        <span className="material-symbols-outlined text-[26px]">group</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Clientes</span>
                    </button>
                    <button onClick={() => setActiveTab('mensajes')} className="flex flex-col items-center justify-center gap-1.5 flex-1 text-gray-400">
                        <span className="material-symbols-outlined text-[26px]">chat_bubble</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Buzón</span>
                    </button>
                    <button onClick={() => { setRole('athlete'); setActiveTab('perfil'); }} className="flex flex-col items-center justify-center gap-1.5 flex-1 text-orange-500">
                        <span className="material-symbols-outlined text-[26px]">logout</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Salir Pro</span>
                    </button>
                </>
            )}
          </div>
        </nav>
      )}

      {isTriageOpen && (
        <TriageModal onClose={() => setIsTriageOpen(false)} onResult={(res) => { setRecommendation(res); setIsTriageOpen(false); }} />
      )}

      {showCancellation && <CancellationPolicy onClose={() => setShowCancellation(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}

      {selectedProfessional && !isBookingOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-[3.5rem] overflow-hidden shadow-2xl relative flex flex-col max-h-[92dvh] animate-in slide-in-from-bottom duration-500">
            <button onClick={() => setSelectedProfessional(null)} className="absolute top-6 right-6 z-10 size-10 bg-white/20 backdrop-blur-md rounded-full text-white flex items-center justify-center">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-full aspect-video relative">
              <img src={selectedProfessional.imageUrl} className="w-full h-full object-cover" alt={selectedProfessional.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-black bg-primary px-3 py-1 rounded-lg uppercase tracking-widest shadow-lg italic">VERIFICADO</span>
                  <div className="flex items-center gap-1 bg-yellow-400 text-black px-2 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-xs font-fill">star</span>
                    <span className="text-[10px] font-black">{selectedProfessional.rating}</span>
                  </div>
                </div>
                <h2 className="text-4xl font-black italic tracking-tighter">{selectedProfessional.name}</h2>
                <p className="text-sm text-white/70 font-bold mt-2 uppercase tracking-wide">{selectedProfessional.specialty}</p>
              </div>
            </div>
            <div className="p-10 overflow-y-auto">
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-[2rem] text-center border border-gray-100 dark:border-gray-700">
                  <span className="block text-2xl font-black italic mb-1">12</span>
                  <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Años Exp.</span>
                </div>
                <div className="bg-primary text-white p-5 rounded-[2rem] text-center shadow-xl shadow-primary/20">
                  <span className="block text-2xl font-black italic mb-1">{selectedProfessional.price}€</span>
                  <span className="text-[8px] text-white/60 font-black uppercase tracking-widest">Sesión</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/30 p-5 rounded-[2rem] text-center border border-gray-100 dark:border-gray-700">
                  <span className="block text-2xl font-black italic mb-1">350+</span>
                  <span className="text-[8px] text-gray-400 font-black uppercase tracking-widest">Atletas</span>
                </div>
              </div>
              <div className="mb-10">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 italic">Sobre el profesional</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{selectedProfessional.bio} Especialista en optimización de rendimiento y recuperación acelerada.</p>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-primary text-white py-6 rounded-[2rem] font-black italic shadow-2xl shadow-primary/30 active:scale-95 transition-transform text-xl uppercase tracking-widest"
              >
                Reservar Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {isBookingOpen && selectedProfessional && (
        <BookingSection 
            professional={selectedProfessional} 
            onClose={() => {
                setIsBookingOpen(false);
                setSelectedProfessional(null);
            }} 
        />
      )}
    </div>
  );
};

export default App;
