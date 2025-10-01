import type { Forest, Feature } from '@/types/forest';

export const forests: Forest[] = [
  {
    id: '1',
    name: 'Forêt du Dja et Lobo',
    location: 'Cameroun',
    image: 'assets/img/forets1.jpg',
    area: '2,000 km²',
    temperature: '26°C',
    coverage: 85,
    humidity: 78,
    description: 'Une forêt tropicale dense du Cameroun avec une biodiversité exceptionnelle.',
    stats: {
      china: 55,
      india: 34,
      brazil: 42,
      others: 39
    }
  },
  {
    id: '2',
    name: 'Forêt de la Sanaga',
    location: 'Cameroun',
    // image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
    image: 'assets/img/forest2.jpg',
    area: '1,500 km²',
    temperature: '24°C',
    coverage: 78,
    humidity: 82,
    description: 'Écosystème forestier riche en faune et flore endémiques.',
    stats: {
      china: 48,
      india: 41,
      brazil: 38,
      others: 45
    }
  },
  {
    id: '3',
    name: 'Forêt du Dja',
    location: 'Cameroun',
    // image: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=800',
    image: "assets/img/forets1.jpg",
    area: '5,260 km²',
    temperature: '25°C',
    coverage: 92,
    humidity: 85,
    description: 'L\'une des plus grandes forêts tropicales du Cameroun.',
    stats: {
      china: 62,
      india: 28,
      brazil: 51,
      others: 33
    }
  },
  {
    id: '4',
    name: 'Forêt de Campo-Ma\'an',
    location: 'Cameroun',
    image: 'assets/img/forest2.jpg',
    area: '2,680 km²',
    temperature: '27°C',
    coverage: 88,
    humidity: 79,
    description: 'Parc national avec une grande diversité d\'espèces.',
    stats: {
      china: 43,
      india: 37,
      brazil: 46,
      others: 41
    }
  },
  {
    id: '5',
    name: 'Forêt de Korup',
    location: 'Cameroun',
    image: 'assets/img/forest1.jpg',
    area: '1,260 km²',
    temperature: '26°C',
    coverage: 94,
    humidity: 88,
    description: 'Forêt ancienne avec des arbres millénaires.',
    stats: {
      china: 58,
      india: 32,
      brazil: 44,
      others: 38
    }
  },
  {
    id: '6',
    name: 'Forêt de Takamanda',
    location: 'Cameroun',
    image: 'assets/img/forest2.jpg',
    area: '676 km²',
    temperature: '23°C',
    coverage: 91,
    humidity: 84,
    description: 'Habitat naturel des gorilles des montagnes.',
    stats: {
      china: 51,
      india: 39,
      brazil: 35,
      others: 47
    }
  }
];

export const features: Feature[] = [
  {
    title: 'Cartographie Littéraire',
    description: 'Visualisation des forêts avec des cartes interactives et données géospatiales en temps réel.',
    icon: 'map'
  },
  {
    title: 'Analyses Techniques',
    description: 'Suivi météorologique, environnemental et analyses prédictives utilisant l\'IA.',
    icon: 'analytics'
  },
  {
    title: 'Expert dédié',
    description: 'Accès direct aux experts forestiers pour conseils et analyses personnalisés.',
    icon: 'user'
  }
];
