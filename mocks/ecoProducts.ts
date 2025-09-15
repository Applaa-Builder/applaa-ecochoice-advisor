import { EcoProduct } from '@/types';

export const ecoProducts: EcoProduct[] = [
  {
    id: '1',
    name: 'Bamboo Toothbrush',
    category: 'Personal Care',
    ecoScore: 9.2,
    description: 'Biodegradable bamboo toothbrush with plant-based bristles.',
    imageUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alternatives: ['Plastic toothbrush', 'Electric toothbrush']
  },
  {
    id: '2',
    name: 'Stainless Steel Water Bottle',
    category: 'Drinkware',
    ecoScore: 8.7,
    description: 'Reusable stainless steel water bottle that eliminates single-use plastic bottles.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    alternatives: ['Plastic water bottles', 'Glass bottles']
  },
  {
    id: '3',
    name: 'Beeswax Food Wraps',
    category: 'Kitchen',
    ecoScore: 9.5,
    description: 'Reusable food wraps made from organic cotton and beeswax, replacing plastic wrap.',
    imageUrl: 'https://images.unsplash.com/photo-1621460248083-1e2f2125f211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    alternatives: ['Plastic wrap', 'Aluminum foil']
  },
  {
    id: '4',
    name: 'Wool Dryer Balls',
    category: 'Laundry',
    ecoScore: 8.9,
    description: 'Reusable wool dryer balls that reduce drying time and replace disposable dryer sheets.',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6ded1d34e648?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    alternatives: ['Dryer sheets', 'Fabric softener']
  },
  {
    id: '5',
    name: 'Biodegradable Phone Case',
    category: 'Electronics',
    ecoScore: 7.8,
    description: 'Phone case made from plant-based materials that will biodegrade at end of life.',
    imageUrl: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alternatives: ['Plastic phone case', 'Silicone phone case']
  },
  {
    id: '6',
    name: 'Reusable Produce Bags',
    category: 'Shopping',
    ecoScore: 9.0,
    description: 'Mesh produce bags for grocery shopping to avoid single-use plastic bags.',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
    alternatives: ['Plastic produce bags']
  },
];