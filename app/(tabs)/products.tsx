import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { ecoProducts } from '@/mocks/ecoProducts';
import EcoProductCard from '@/components/EcoProductCard';
import CategoryPills from '@/components/CategoryPills';
import { EcoProduct } from '@/types';

export default function ProductsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories from products
  const categories = ['all', ...Array.from(new Set(ecoProducts.map(product => product.category)))];

  // Filter products based on selected category and search query
  const filteredProducts = ecoProducts
    .filter(product => 
      selectedCategory === 'all' || product.category === selectedCategory
    )
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleProductPress = (product: EcoProduct) => {
    router.push(`/product/${product.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={theme.colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search eco-friendly products..."
          placeholderTextColor={theme.colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <EcoProductCard product={item} onPress={() => handleProductPress(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    margin: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 50,
    color: theme.colors.text,
  },
  productContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
  },
});