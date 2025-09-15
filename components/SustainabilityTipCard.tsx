import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Heart } from 'lucide-react-native';
import { SustainabilityTip } from '@/types';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';

type SustainabilityTipCardProps = {
  tip: SustainabilityTip;
  onPress?: () => void;
};

export default function SustainabilityTipCard({ tip, onPress }: SustainabilityTipCardProps) {
  const { profile, saveTip, removeSavedTip } = useUserStore();
  const isSaved = profile.savedTips.includes(tip.id);

  const handleSave = () => {
    if (isSaved) {
      removeSavedTip(tip.id);
    } else {
      saveTip(tip.id);
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
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      {tip.imageUrl && (
        <Image source={{ uri: tip.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{tip.title}</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Heart
              size={20}
              color={isSaved ? theme.colors.primary : theme.colors.textSecondary}
              fill={isSaved ? theme.colors.primary : 'none'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{tip.description}</Text>
        <View style={styles.footer}>
          <View style={[styles.impactBadge, { backgroundColor: getImpactColor() }]}>
            <Text style={styles.impactText}>{tip.impact.toUpperCase()} IMPACT</Text>
          </View>
          <Text style={styles.category}>{tip.category}</Text>
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
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.h3,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  saveButton: {
    padding: theme.spacing.xs,
  },
  description: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  impactBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  impactText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  category: {
    ...theme.typography.caption,
    textTransform: 'capitalize',
  },
});