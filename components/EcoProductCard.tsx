import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { EcoProduct } from '@/types';
import { theme } from '@/constants/theme';
import EcoScoreCard from './EcoScoreCard';

type EcoProductCardProps = {
  product: EcoProduct;
  onPress?: () => void;
};

export default function EcoProductCard({ product, onPress }: EcoProductCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {product.imageUrl ? (
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <View style={styles.scoreContainer}>
          <EcoScoreCard score={product.ecoScore} label="Eco Score" size="small" />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    height: 120,
  },
  imageContainer: {
    width: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.border,
  },
  scoreContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  name: {
    ...theme.typography.h3,
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  category: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.bodySmall,
  },
});