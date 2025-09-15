import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { sustainabilityTips } from '@/mocks/sustainabilityTips';
import { useUserStore } from '@/store/userStore';
import Button from '@/components/Button';

export default function TipDetailScreen() {
  const { id } = useLocalSearchParams();
  const { profile, saveTip, removeSavedTip, updateSustainabilityScore } = useUserStore();
  
  const tip = sustainabilityTips.find(t => t.id === id);
  
  if (!tip) {
    return (
      <View style={[globalStyles.container, globalStyles.center]}>
        <Text style={theme.typography.h2}>Tip not found</Text>
      </View>
    );
  }
  
  const isSaved = profile.savedTips.includes(tip.id);
  
  const handleSave = () => {
    if (isSaved) {
      removeSavedTip(tip.id);
    } else {
      saveTip(tip.id);
      // Increase sustainability score when saving a tip
      updateSustainabilityScore(profile.sustainabilityScore + 2);
    }
  };
  
  const getImpactColor = () => {
    switch (tip.impact) {
      case 'high':
        return theme.colors.success;
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {tip.imageUrl && (
        <Image source={{ uri: tip.imageUrl }} style={styles.image} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{tip.title}</Text>
          <View style={[styles.impactBadge, { backgroundColor: getImpactColor() }]}>
            <Text style={styles.impactText}>{tip.impact.toUpperCase()} IMPACT</Text>
          </View>
        </View>
        
        <Text style={styles.category}>Category: {tip.category}</Text>
        
        <Text style={styles.description}>{tip.description}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Why This Matters</Text>
        <Text style={styles.sectionText}>
          Making sustainable choices like this one helps reduce your environmental footprint and contributes to a healthier planet. Small changes in daily habits can lead to significant positive impacts over time.
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>How to Implement</Text>
        <Text style={styles.sectionText}>
          Start small and be consistent. Incorporate this tip into your routine gradually, and you'll find it becomes second nature. Remember that every sustainable choice counts!
        </Text>
        
        <Button
          title={isSaved ? "Saved to Favorites" : "Save to Favorites"}
          onPress={handleSave}
          variant={isSaved ? "secondary" : "primary"}
          icon={<Heart size={18} color="white" />}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  impactBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  impactText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  category: {
    ...theme.typography.bodySmall,
    color: theme.colors.primary,
    textTransform: 'capitalize',
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
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
  saveButton: {
    marginTop: theme.spacing.xl,
  },
});