import { SustainableRecipe } from '@/types';

export const sustainableRecipes: SustainableRecipe[] = [
  {
    id: '1',
    name: 'Seasonal Vegetable Stir Fry',
    description: 'A quick and nutritious stir fry using seasonal vegetables and minimal oil.',
    ingredients: [
      '2 cups seasonal vegetables (bell peppers, broccoli, carrots, etc.)',
      '1 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 tbsp low-sodium soy sauce',
      '1 tsp ginger, grated',
      '1/2 cup brown rice, cooked'
    ],
    instructions: [
      'Heat oil in a pan over medium heat.',
      'Add garlic and ginger, sauté for 30 seconds.',
      'Add vegetables and stir fry for 5-7 minutes until tender-crisp.',
      'Add soy sauce and toss to combine.',
      'Serve over cooked brown rice.'
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    carbonFootprint: 0.5,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    tags: ['vegan', 'seasonal', 'quick', 'low-carbon']
  },
  {
    id: '2',
    name: 'Lentil and Vegetable Soup',
    description: 'Hearty and nutritious soup using plant-based protein and local vegetables.',
    ingredients: [
      '1 cup dried lentils, rinsed',
      '1 onion, diced',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '2 cloves garlic, minced',
      '1 tbsp olive oil',
      '4 cups vegetable broth',
      '1 tsp cumin',
      '1/2 tsp paprika',
      'Salt and pepper to taste'
    ],
    instructions: [
      'Heat oil in a large pot over medium heat.',
      'Add onion, carrots, and celery. Sauté for 5 minutes.',
      'Add garlic and spices, cook for 1 minute.',
      'Add lentils and vegetable broth. Bring to a boil.',
      'Reduce heat and simmer for 25-30 minutes until lentils are tender.',
      'Season with salt and pepper to taste.'
    ],
    prepTime: 15,
    cookTime: 35,
    servings: 4,
    carbonFootprint: 0.3,
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    tags: ['vegan', 'protein', 'batch-cooking', 'low-carbon']
  },
  {
    id: '3',
    name: 'No-Waste Vegetable Frittata',
    description: 'Use up leftover vegetables in this protein-rich, zero-waste frittata.',
    ingredients: [
      '6 eggs',
      '1/4 cup milk (or plant-based alternative)',
      '2 cups leftover vegetables, chopped',
      '1/4 cup cheese (optional)',
      '1 tbsp olive oil',
      'Salt and pepper to taste',
      'Fresh herbs (optional)'
    ],
    instructions: [
      'Preheat oven to 375°F (190°C).',
      'Whisk eggs and milk together in a bowl. Season with salt and pepper.',
      'Heat oil in an oven-safe skillet over medium heat.',
      'Add vegetables and sauté for 2-3 minutes.',
      'Pour egg mixture over vegetables and cook for 3-4 minutes until edges set.',
      'Sprinkle with cheese if using and transfer to oven.',
      'Bake for 10-12 minutes until set and lightly golden.',
      'Garnish with fresh herbs if desired.'
    ],
    prepTime: 10,
    cookTime: 20,
    servings: 4,
    carbonFootprint: 0.8,
    imageUrl: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2020&q=80',
    tags: ['vegetarian', 'zero-waste', 'protein', 'quick']
  }
];