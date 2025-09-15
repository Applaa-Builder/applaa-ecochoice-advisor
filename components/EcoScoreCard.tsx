import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

type EcoScoreCardProps = {
  score: number;
  label: string;
  size?: 'small' | 'medium' | 'large';
};

export default function EcoScoreCard({ score, label, size = 'medium' }: EcoScoreCardProps) {
  const getColor = () => {
    if (score >= 8) return theme.colors.success;
    if (score >= 5) return theme.colors.warning;
    return theme.colors.error;
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          container: { width: 80, height: 80 },
          score: { fontSize: 24 },
          label: { fontSize: 10 },
        };
      case 'large':
        return {
          container: { width: 140, height: 140 },
          score: { fontSize: 42 },
          label: { fontSize: 14 },
        };
      default:
        return {
          container: { width: 100, height: 100 },
          score: { fontSize: 32 },
          label: { fontSize: 12 },
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[styles.container, sizeStyles.container, { borderColor: getColor() }]}>
      <Text style={[styles.score, sizeStyles.score, { color: getColor() }]}>
        {score.toFixed(1)}
      </Text>
      <Text style={[styles.label, sizeStyles.label]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.round,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.sm,
    margin: theme.spacing.sm,
  },
  score: {
    fontWeight: 'bold',
  },
  label: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.xs,
  },
});