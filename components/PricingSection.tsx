
import React, { useState } from 'react';

interface PricingSectionProps {
  onBack: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onBack }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: 'Base',
      price: 'Gratis',
      desc: 'Perfecto para empezar',
      button: 'Empezar Gratis',
      features: ['1€ / cita confirmada', 'Perfil básico', 'Gestión de agenda'],
      popular: false,
      color: 'bg-gray-50 dark:bg-gray-800'
    },
    {
      name: 'Pro',
      price: '29€',
      period: '/mes',
      desc: 'Para crecer sin límites',
      button: 'Elegir Pro',
      features: ['Pagos automáticos', 'Todo lo de Base', 'Posicionamiento premium'],
      popular: true,
      color: 'bg-white dark:bg-gray-800 border-2 border-primary shadow-xl ring-4 ring-primary/10'
    },
    {
      name: 'Expert',
      price: '59€',
      period: '/mes',
      desc: 'Máximo rendimiento',
      button: 'Elegir Expert',
      features: ['Soporte VIP 24/7', 'Analíticas avanzadas', 'Todo lo de Pro'],
      popular: false,
      color: 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
    }
  ];

  const faqs = [
    { q: '¿Qué cuenta como operación?', a: 'Cualquier reserva confirmada a través de la plataforma.' },
    { q: '¿Puedo cancelar cuando quiera?', a: 'Sí, todas nuestras suscripciones son sin compromiso de permanencia.' },
    { q: '¿Cómo funciona la verificación?', a: 'Nuestro equipo revisa tus títulos y certificados en 24-48h.' },
    { q: '¿Cómo se gestionan reembolsos?', a: 'Se procesan automáticamente según tu política de cancelación elegida.' },
  ];

  return (
    <div className="flex flex-col animate-in slide-in-from-right duration-300 bg-gray-50 dark:bg-background-dark min-h-screen pb-24">
      {/* Header */}
      <div className="p-8 text-center bg-white dark:bg-background-dark">
        <h1 className="text-3xl font-black mb-2">Impulsa tu carrera en Headpal</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto leading-relaxed">
          Planes flexibles diseñados para profesionales del deporte y el bienestar. Elige cómo quieres crecer.
        </p>
      </div>

      <div className="px-4 -mt-4 flex flex-col gap-6">
        {plans.map((plan, i) => (
          <div key={i} className={`relative rounded-[2rem] p-8 ${plan.color} overflow-hidden`}>
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-6 py-1 rounded-b-xl tracking-widest uppercase">
                MÁS POPULAR
              </div>
            )}
            <h3 className="font-bold text-gray-600 dark:text-gray-400 mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-black">{plan.price}</span>
              {plan.period && <span className="text-gray-400 font-bold">{plan.period}</span>}
            </div>
            <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>
            
            <button className={`w-full py-4 rounded-2xl font-black text-sm mb-8 transition-all active:scale-95 ${plan.popular ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
              {plan.button}
            </button>

            <ul className="space-y-4">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium">
                  <div className="size-5 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Complements */}
      <div className="px-4 py-12">
        <h2 className="text-2xl font-black mb-6">Complementos</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl min-w-[280px] shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="size-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-black">Marketing Boost</h4>
              <span className="text-xs font-bold text-primary">+15€ / mes</span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mb-6">Aumenta tu visibilidad en los resultados de búsqueda locales.</p>
            <button className="text-primary text-xs font-black">Añadir al plan</button>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl min-w-[280px] shadow-sm border border-gray-100 dark:border-gray-700 opacity-50">
            <div className="size-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-500 mb-4">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h4 className="font-black mb-1">Badge Elite</h4>
            <p className="text-xs text-gray-500">Próximamente para miembros verificados.</p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="px-4 pb-12">
        <h2 className="text-2xl font-black mb-6">Preguntas Frecuentes</h2>
        <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b last:border-0 border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left active:bg-gray-50"
              >
                <span className="text-sm font-bold">{faq.q}</span>
                <span className={`material-symbols-outlined transition-transform ${openFaq === i ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-xs text-gray-500 leading-relaxed animate-in slide-in-from-top duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pb-12">
         <button onClick={onBack} className="w-full text-center text-gray-400 text-xs underline">Volver al perfil</button>
      </div>
    </div>
  );
};
