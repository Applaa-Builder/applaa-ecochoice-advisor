import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';

type ProgressChartProps = {
  data: {
    value: number;
    target: number;
    label: string;
    color?: string;
  }[];
};

export default function ProgressChart({ data }: ProgressChartProps) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => {
        const percentage = Math.min(100, (item.value / item.target) * 100);
        const color = item.color || theme.colors.primary;
        
        return (
          <View key={index} style={styles.chartItem}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.values}>
                {item.value.toFixed(1)} / {item.target.toFixed(1)}
              </Text>
            </View>
            <View style={styles.barContainer}>
              <View style={[styles.bar, { backgroundColor: color, width: `${percentage}%` }]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  chartItem: {
    marginBottom: theme.spacing.md,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  label: {
    ...theme.typography.body,
    fontWeight: '500',
  },
  values: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  barContainer: {
    height: 8,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: theme.borderRadius.round,
  },
});