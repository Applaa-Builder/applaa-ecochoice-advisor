import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bike, Car, ShoppingBag, Utensils, Zap, X } from 'lucide-react-native';
import { CarbonActivity } from '@/types';
import { theme } from '@/constants/theme';

type CarbonActivityCardProps = {
  activity: CarbonActivity;
  onDelete?: () => void;
};

export default function CarbonActivityCard({ activity, onDelete }: CarbonActivityCardProps) {
  const getIcon = () => {
    switch (activity.icon) {
      case 'bike':
        return <Bike size={24} color={theme.colors.primary} />;
      case 'car':
        return <Car size={24} color={theme.colors.error} />;
      case 'shopping-bag':
        return <ShoppingBag size={24} color={theme.colors.warning} />;
      case 'utensils':
        return <Utensils size={24} color={theme.colors.warning} />;
      case 'zap':
        return <Zap size={24} color={theme.colors.warning} />;
      case 'bus':
        return <Car size={24} color={theme.colors.warning} />;
      case 'salad':
        return <Utensils size={24} color={theme.colors.success} />;
      default:
        return <Zap size={24} color={theme.colors.textSecondary} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.content}>
        <Text style={styles.name}>{activity.name}</Text>
        <Text style={styles.date}>{activity.date}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.carbonAmount}>
          {activity.carbonAmount === 0
            ? '0'
            : activity.carbonAmount.toFixed(1)}
          <Text style={styles.unit}> kg CO₂</Text>
        </Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <X size={16} color={theme.colors.error} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...theme.typography.body,
    fontWeight: '500',
  },
  date: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  carbonAmount: {
    ...theme.typography.body,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  unit: {
    ...theme.typography.bodySmall,
    fontWeight: 'normal',
    color: theme.colors.textSecondary,
  },
  deleteButton: {
    marginTop: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
});