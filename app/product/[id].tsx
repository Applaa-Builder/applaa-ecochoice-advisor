import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { ecoProducts } from '@/mocks/ecoProducts';
import EcoScoreCard from '@/components/EcoScoreCard';
import Button from '@/components/Button';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  
  const product = ecoProducts.find(p => p.id === id);
  
  if (!product) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <Text style={theme.typography.h2}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image 
        source={{ uri: product.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80' }} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.title}>{product.name}</Text>
          </View>
          <EcoScoreCard score={product.ecoScore} label="Eco Score" />
        </View>
        
        <Text style={styles.description}>{product.description}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Environmental Impact</Text>
        <Text style={styles.sectionText}>
          This product has a significantly lower environmental footprint compared to conventional alternatives. By choosing this product, you're helping reduce waste, conserve resources, and minimize pollution.
        </Text>
        
        <View style={styles.divider} />
        
        {product.alternatives && product.alternatives.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Conventional Alternatives</Text>
            <View style={styles.alternativesContainer}>
              {product.alternatives.map((alternative, index) => (
                <View key={index} style={styles.alternativeItem}>
                  <Text style={styles.alternativeText}>{alternative}</Text>
                </View>
              ))}
            </View>
            <View style={styles.divider} />
          </>
        )}
        
        <Button
          title="Find Where to Buy"
          onPress={() => {}}
          style={styles.button}
          fullWidth
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  contentContainer: {
    paddingBottom: theme.spacing.xxl,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  category: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  title: {
    ...theme.typography.h1,
    maxWidth: '80%',
  },
  description: {
    ...theme.typography.body,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.sm,
  },
  sectionText: {
    ...theme.typography.body,
    lineHeight: 24,
  },
  alternativesContainer: {
    marginTop: theme.spacing.sm,
  },
  alternativeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
  },
  alternativeText: {
    ...theme.typography.body,
  },
  button: {
    marginTop: theme.spacing.md,
  },
});