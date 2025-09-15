export type SustainabilityTip = {
  id: string;
  category: 'food' | 'energy' | 'water' | 'waste' | 'transport' | 'general';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  imageUrl?: string;
};

export type EcoProduct = {
  id: string;
  name: string;
  category: string;
  ecoScore: number;
  description: string;
  imageUrl?: string;
  alternatives?: string[];
};

export type CarbonActivity = {
  id: string;
  type: 'transport' | 'food' | 'energy' | 'shopping' | 'other';
  name: string;
  date: string;
  carbonAmount: number;
  icon: string;
};

export type SustainableRecipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  carbonFootprint: number;
  imageUrl?: string;
  tags: string[];
};

export type UserProfile = {
  sustainabilityScore: number;
  completedChallenges: number;
  savedTips: string[];
  savedRecipes: string[];
  carbonFootprint: number;
};

export type AIMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string | Array<ContentPart>;
};

export type ContentPart = 
  | { type: 'text'; text: string; }
  | { type: 'image'; image: string };