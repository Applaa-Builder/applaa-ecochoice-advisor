import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Clock, Users, Leaf, Check } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { sustainableRecipes } from '@/mocks/sustainableRecipes';
import { useUserStore } from '@/store/userStore';
import Button from '@/components/Button';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const { profile, saveRecipe, removeSavedRecipe } = useUserStore();
  
  const recipe = sustainableRecipes.find(r => r.id === id);
  
  if (!recipe) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <Text style={theme.typography.h2}>Recipe not found</Text>
      </View>
    );
  }
  
  const isSaved = profile.savedRecipes.includes(recipe.id);
  
  const handleSave = () => {
    if (isSaved) {
      removeSavedRecipe(recipe.id);
    } else {
      saveRecipe(recipe.id);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Image 
        source={{ uri: recipe.imageUrl || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }} 
        style={styles.image} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.description}>{recipe.description}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Clock size={18} color={theme.colors.textSecondary} />
            <Text style={styles.metaText}>
              {recipe.prepTime + recipe.cookTime} min
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Users size={18} color={theme.colors.textSecondary} />
            <Text style={styles.metaText}>{recipe.servings} servings</Text>
          </View>
          <View style={styles.metaItem}>
            <Leaf size={18} color={theme.colors.success} />
            <Text style={styles.metaText}>
              {recipe.carbonFootprint.toFixed(1)} kg CO₂
            </Text>
          </View>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>• {ingredient}</Text>
          ))}
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.instructionsList}>
          {recipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={styles.instructionNumber}>
                <Text style={styles.instructionNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.instruction}>{instruction}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Sustainability Notes</Text>
        <Text style={styles.sectionText}>
          This recipe has a carbon footprint of {recipe.carbonFootprint.toFixed(1)} kg CO₂ equivalent per serving, which is lower than the average meal. By choosing plant-based ingredients and seasonal produce, you're making a positive environmental impact.
        </Text>
        
        <Button
          title={isSaved ? "Saved to Favorites" : "Save Recipe"}
          onPress={handleSave}
          variant={isSaved ? "secondary" : "primary"}
          style={styles.saveButton}
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
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.sm,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.md,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  metaText: {
    ...theme.typography.bodySmall,
    marginLeft: theme.spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  ingredientsList: {
    marginBottom: theme.spacing.md,
  },
  ingredient: {
    ...theme.typography.body,
    marginBottom: theme.spacing.sm,
  },
  instructionsList: {
    marginBottom: theme.spacing.md,
  },
  instructionItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  instructionNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    marginTop: 2,
  },
  instructionNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  instruction: {
    ...theme.typography.body,
    flex: 1,
  },
  sectionText: {
    ...theme.typography.body,
    lineHeight: 24,
  },
  saveButton: {
    marginTop: theme.spacing.xl,
  },
});