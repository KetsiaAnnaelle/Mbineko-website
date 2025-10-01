export interface Forest {
  id: string;
  name: string;
  location: string;
  image: string;
  area: string;
  temperature: string;
  coverage: number;
  humidity: number;
  description: string;
  stats: {
    china: number;
    india: number;
    brazil: number;
    others: number;
  };
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}
