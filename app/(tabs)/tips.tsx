import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { sustainabilityTips } from '@/mocks/sustainabilityTips';
import SustainabilityTipCard from '@/components/SustainabilityTipCard';
import CategoryPills from '@/components/CategoryPills';
import { SustainabilityTip } from '@/types';

export default function TipsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Extract unique categories from tips
  const categories = ['all', ...Array.from(new Set(sustainabilityTips.map(tip => tip.category)))];

  // Filter tips based on selected category
  const filteredTips = selectedCategory === 'all'
    ? sustainabilityTips
    : sustainabilityTips.filter(tip => tip.category === selectedCategory);

  const handleTipPress = (tip: SustainabilityTip) => {
    router.push(`/tip/${tip.id}`);
  };

  return (
    <View style={styles.container}>
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      
      <FlatList
        data={filteredTips}
        renderItem={({ item }) => (
          <View style={styles.tipContainer}>
            <SustainabilityTipCard tip={item} onPress={() => handleTipPress(item)} />
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
  tipContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  listContent: {
    paddingVertical: theme.spacing.md,
  },
});