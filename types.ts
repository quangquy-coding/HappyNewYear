
export interface GreetingData {
  name: string;
  wish: string;
  theme: 'neon' | 'classic' | 'cyberpunk' | 'nature';
}

export interface GeneratedCard {
  id: string;
  imageUrl: string;
  text: string;
  timestamp: number;
}
