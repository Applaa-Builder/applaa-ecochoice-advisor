import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Clock, Users, Leaf } from 'lucide-react-native';
import { SustainableRecipe } from '@/types';
import { theme } from '@/constants/theme';

type RecipeCardProps = {
  recipe: SustainableRecipe;
  onPress?: () => void;
};

export default function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: recipe.imageUrl || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.description}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.colors.textSecondary} />
            <Text style={styles.metaText}>
              {recipe.prepTime + recipe.cookTime} min
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={14} color={theme.colors.textSecondary} />
            <Text style={styles.metaText}>{recipe.servings}</Text>
          </View>
          <View style={styles.metaItem}>
            <Leaf size={14} color={theme.colors.success} />
            <Text style={styles.metaText}>
              {recipe.carbonFootprint.toFixed(1)} kg CO₂
            </Text>
          </View>
        </View>
        <View style={styles.tagsContainer}>
          {recipe.tags.slice(0, 3).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
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
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.md,
  },
  name: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.xs,
  },
  description: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  metaText: {
    ...theme.typography.caption,
    marginLeft: theme.spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
  },
  tagText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
  },
});