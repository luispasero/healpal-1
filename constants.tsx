
import { Professional, Category } from './types';

export const PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Dr. Marc Soler',
    category: 'Recuperación',
    specialty: 'Readaptación deportiva y rodilla',
    location: 'Madrid, Chamartín',
    price: 65,
    rating: 4.9,
    reviews: 124,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400',
    availability: ['Lunes 10:00', 'Martes 16:00'],
    bio: 'Especialista en lesiones de larga duración.',
    isOnline: true,
    isPresencial: true,
    isTrending: true
  },
  {
    id: '2',
    name: 'Clara Martínez',
    category: 'Servicios',
    specialty: 'Powerlifting y fuerza',
    location: 'Barcelona',
    price: 50,
    rating: 4.8,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=400',
    availability: ['Lunes 08:00', 'Miércoles 18:00'],
    bio: 'Ayudo a atletas a romper sus techos de fuerza.',
    isOnline: true,
    isPresencial: true,
    isTrending: false
  },
  {
    id: '3',
    name: 'Roberto Gómez',
    category: 'Nutrición',
    specialty: 'Rendimiento resistencia',
    location: 'Valencia',
    price: 75,
    rating: 5.0,
    reviews: 56,
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
    availability: ['Martes 11:00'],
    bio: 'Optimización metabólica para triatlón.',
    isOnline: true,
    isPresencial: false,
    isTrending: true
  },
  {
    id: '4',
    name: 'Dra. Elena Ruiz',
    category: 'Psicología',
    specialty: 'Gestión del estrés',
    location: 'Sevilla',
    price: 80,
    rating: 4.7,
    reviews: 42,
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    availability: ['Viernes 12:00'],
    bio: 'Psicóloga deportiva enfocada en alto rendimiento.',
    isOnline: true,
    isPresencial: true,
    isTrending: false
  },
  {
    id: '5',
    name: 'Set Mancuernas 5kg',
    category: 'Equipamiento',
    specialty: 'Entrenamiento en casa',
    location: 'Envío nacional',
    price: 35,
    rating: 4.9,
    reviews: 210,
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa29617c?auto=format&fit=crop&q=80&w=400',
    availability: [],
    bio: 'Revestimiento de neopreno de alta calidad.',
    isOnline: true,
    isPresencial: false,
    isTrending: true
  }
];

export const CATEGORIES: {name: Category, icon: string}[] = [
  { name: 'Equipamiento', icon: 'fitness_center' },
  { name: 'Nutrición', icon: 'nutrition' },
  { name: 'Recuperación', icon: 'self_improvement' },
  { name: 'Servicios', icon: 'sports_martial_arts' },
  { name: 'Psicología', icon: 'psychology' }
];
