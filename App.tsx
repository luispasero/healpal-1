
import React, { useState, useMemo, useEffect } from 'react';
import { PROFESSIONALS, CATEGORIES } from './constants';
import { Category, Professional, AIRecommendation } from './types';
import { TriageModal } from './components/TriageModal';
import { HomeSection } from './components/HomeSection';
import { PricingSection } from './components/PricingSection';
import { SearchSection } from './components/SearchSection';
import { BookingSection } from './components/BookingSection';
import { ProfessionalDashboard } from './components/ProfessionalDashboard';
import { AthleteDashboard } from './components/AthleteDashboard';
import { VaultSection } from './components/VaultSection';
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
  const [activeTab, setActiveTab] = useState<'inicio' | 'buscar' | 'equipo' | 'docs' | 'perfil' | 'planes' | 'dashboard'>('inicio');
  const [showCancellation, setShowCancellation] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const savedFavs = localStorage.getItem('headpal_favs');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  useEffect(() => {
    localStorage.setItem('headpal_favs', JSON.stringify(favorites));
  }, [favorites]);

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
    // Si el rol es profesional, ignoramos el sistema de pestañas de atleta
    if (role === 'professional') {
        return <ProfessionalDashboard onShowMessages={() => {}} />;
    }

    switch (activeTab) {
      case 'inicio':
        return <AthleteDashboard />;
      case 'buscar':
        return <SearchSection professionals={filteredProfessionals} onSelectProfessional={handleSelectProfessional} />;
      case 'docs':
        return <VaultSection />;
      case 'perfil':
        return (
          <div className="p-6 flex flex-col gap-6 bg-gray-50 dark:bg-background-dark min-h-screen pb-32">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-[2.5rem] shadow-card">
              <div className="size-20 rounded-full bg-cover ring-4 ring-gray-50" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200")'}}></div>
              <div>
                <h4 className="font-black text-xl italic">Camila Silva</h4>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Deportista Amateur</p>
                <button 
                    onClick={() => setRole(role === 'athlete' ? 'professional' : 'athlete')}
                    className="mt-3 bg-primary/10 text-primary px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
                >
                    Cambiar a Modo Pro
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-700 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-black text-2xl mb-2 italic">¿Eres profesional?</h4>
                <p className="text-sm opacity-90 mb-6 leading-relaxed">Únete a la red más exclusiva de expertos y gestiona tu carrera.</p>
                <button 
                  onClick={() => setActiveTab('planes')}
                  className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-sm shadow-sm active:scale-95 transition-transform"
                >
                  Comparar Planes
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 size-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Política de Cancelación', icon: 'event_busy', action: () => setShowCancellation(true) },
                { label: 'Privacidad y Seguridad', icon: 'shield', action: () => setShowPrivacy(true) },
                { label: 'Configuración de cuenta', icon: 'settings' },
                { label: 'Cerrar Sesión', icon: 'logout', color: 'text-red-500' }
              ].map((item, i) => (
                <button key={i} onClick={item.action} className={`w-full flex items-center gap-4 p-5 bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm font-black text-sm ${item.color || ''}`}>
                  <span className="material-symbols-outlined text-gray-400">{item.icon}</span>
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

  const isPlainView = activeTab === 'planes';

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark shadow-2xl transition-colors">
      
      {renderContent()}

      {!isPlainView && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-background-dark/95 backdrop-blur-lg border-t border-gray-100 dark:border-gray-800">
          <div className="max-w-md mx-auto flex justify-between items-center px-6 h-18 md:h-20">
            {role === 'athlete' ? (
                <>
                    <button onClick={() => setActiveTab('inicio')} className={`flex flex-col items-center justify-center gap-1 w-12 ${activeTab === 'inicio' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'inicio' ? "'FILL' 1" : "" }}>home</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Inicio</span>
                    </button>
                    <button onClick={() => setActiveTab('buscar')} className={`flex flex-col items-center justify-center gap-1 w-12 ${activeTab === 'buscar' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'buscar' ? "'FILL' 1" : "" }}>search</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Buscar</span>
                    </button>
                    <button onClick={() => setActiveTab('equipo')} className={`flex flex-col items-center justify-center gap-1 w-12 ${activeTab === 'equipo' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'equipo' ? "'FILL' 1" : "" }}>groups</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Equipo</span>
                    </button>
                    <button onClick={() => setActiveTab('docs')} className={`flex flex-col items-center justify-center gap-1 w-12 ${activeTab === 'docs' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'docs' ? "'FILL' 1" : "" }}>inventory_2</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Bóveda</span>
                    </button>
                    <button onClick={() => setActiveTab('perfil')} className={`flex flex-col items-center justify-center gap-1 w-12 ${activeTab === 'perfil' ? 'text-primary' : 'text-gray-400'}`}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'perfil' ? "'FILL' 1" : "" }}>person</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Perfil</span>
                    </button>
                </>
            ) : (
                <>
                    <button className="flex flex-col items-center justify-center gap-1 flex-1 text-primary">
                        <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Panel</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400">
                        <span className="material-symbols-outlined">calendar_today</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Agenda</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400">
                        <span className="material-symbols-outlined">group</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Clientes</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400">
                        <span className="material-symbols-outlined">description</span>
                        <span className="text-[9px] font-black uppercase tracking-tighter">Docs</span>
                    </button>
                    <button onClick={() => setRole('athlete')} className="flex flex-col items-center justify-center gap-1 flex-1 text-gray-400">
                        <span className="material-symbols-outlined">swap_horiz</span>
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
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-t-[3rem] overflow-hidden shadow-2xl relative flex flex-col max-h-[90dvh] animate-in slide-in-from-bottom duration-500">
            <button onClick={() => setSelectedProfessional(null)} className="absolute top-4 right-4 z-10 p-2 bg-white/20 backdrop-blur rounded-full text-white">
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-full aspect-[4/3] relative">
              <img src={selectedProfessional.imageUrl} className="w-full h-full object-cover" alt={selectedProfessional.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="text-[10px] font-black bg-primary px-3 py-1 rounded-lg uppercase tracking-widest mb-3 inline-block shadow-lg italic">PREMIUM</span>
                <h2 className="text-3xl font-black italic">{selectedProfessional.name}</h2>
                <p className="text-xs text-white/80 font-bold mt-1">{selectedProfessional.specialty}</p>
              </div>
            </div>
            <div className="p-8 overflow-y-auto">
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-3xl text-center border border-gray-100 dark:border-gray-700">
                  <span className="block text-xl font-black italic">{selectedProfessional.rating}</span>
                  <span className="text-[8px] text-gray-400 font-black uppercase">Rating</span>
                </div>
                <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-3xl text-center border border-primary/20">
                  <span className="block text-xl font-black text-primary italic">{selectedProfessional.price}€</span>
                  <span className="text-[8px] text-primary/60 font-black uppercase">Sesión</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-3xl text-center border border-gray-100 dark:border-gray-700">
                  <span className="block text-xl font-black italic">{selectedProfessional.reviews}</span>
                  <span className="text-[8px] text-gray-400 font-black uppercase">Reviews</span>
                </div>
              </div>
              <div className="mb-10">
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-3 italic">Sobre este profesional</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{selectedProfessional.bio}</p>
              </div>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="w-full bg-primary text-white py-5 rounded-2xl font-black italic shadow-2xl shadow-primary/30 active:scale-95 transition-transform text-lg"
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
