
export type Category = 'Recuperación' | 'Servicios' | 'Nutrición' | 'Equipamiento' | 'Psicología';

export interface Professional {
  id: string;
  name: string;
  category: Category;
  specialty: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  availability: string[];
  bio: string;
  isOnline: boolean;
  isPresencial: boolean;
  isTrending?: boolean;
}

export interface Appointment {
  id: string;
  professionalId: string;
  professionalName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface TriageData {
  objective: string;
  discomfort: string;
  location: string;
  modality: 'online' | 'presencial' | 'ambos';
  availability: string;
}

export interface AIRecommendation {
  priority: Category[];
  reason: string;
  tips: string[];
}
