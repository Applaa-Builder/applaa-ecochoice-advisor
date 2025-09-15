import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Car, Utensils, Zap, ShoppingBag, Bike, Bus } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { useCarbonStore } from '@/store/carbonStore';
import { useUserStore } from '@/store/userStore';
import Button from '@/components/Button';

type ActivityType = {
  id: string;
  type: 'transport' | 'food' | 'energy' | 'shopping' | 'other';
  name: string;
  icon: React.ReactNode;
  carbonAmount: number;
};

export default function AddCarbonActivityScreen() {
  const router = useRouter();
  const { addActivity } = useCarbonStore();
  const { updateSustainabilityScore, profile } = useUserStore();
  const [selectedActivity, setSelectedActivity] = useState<ActivityType | null>(null);

  const activities: ActivityType[] = [
    {
      id: 'car',
      type: 'transport',
      name: 'Car trip (10 miles)',
      icon: <Car size={24} color={theme.colors.error} />,
      carbonAmount: 4.2,
    },
    {
      id: 'bus',
      type: 'transport',
      name: 'Bus trip (10 miles)',
      icon: <Bus size={24} color={theme.colors.warning} />,
      carbonAmount: 1.2,
    },
    {
      id: 'bike',
      type: 'transport',
      name: 'Bike ride',
      icon: <Bike size={24} color={theme.colors.success} />,
      carbonAmount: 0,
    },
    {
      id: 'meat_meal',
      type: 'food',
      name: 'Meat-based meal',
      icon: <Utensils size={24} color={theme.colors.error} />,
      carbonAmount: 3.5,
    },
    {
      id: 'vegetarian_meal',
      type: 'food',
      name: 'Vegetarian meal',
      icon: <Utensils size={24} color={theme.colors.warning} />,
      carbonAmount: 1.2,
    },
    {
      id: 'vegan_meal',
      type: 'food',
      name: 'Plant-based meal',
      icon: <Utensils size={24} color={theme.colors.success} />,
      carbonAmount: 0.5,
    },
    {
      id: 'electricity',
      type: 'energy',
      name: 'Daily electricity use',
      icon: <Zap size={24} color={theme.colors.warning} />,
      carbonAmount: 2.4,
    },
    {
      id: 'clothing',
      type: 'shopping',
      name: 'New clothing item',
      icon: <ShoppingBag size={24} color={theme.colors.warning} />,
      carbonAmount: 5.2,
    },
  ];

  const handleSelectActivity = (activity: ActivityType) => {
    setSelectedActivity(activity);
  };

  const handleAddActivity = () => {
    if (selectedActivity) {
      const today = new Date().toISOString().split('T')[0];
      
      addActivity({
        type: selectedActivity.type,
        name: selectedActivity.name,
        date: today,
        carbonAmount: selectedActivity.carbonAmount,
        icon: selectedActivity.id,
      });
      
      // Update sustainability score based on carbon impact
      // Lower carbon activities increase score, higher carbon activities decrease it
      const scoreChange = selectedActivity.carbonAmount === 0 
        ? 5  // Zero carbon activities give a good boost
        : selectedActivity.carbonAmount < 2 
          ? 2  // Low carbon activities give a small boost
          : -1; // High carbon activities slightly decrease score
      
      updateSustainabilityScore(Math.max(0, profile.sustainabilityScore + scoreChange));
      
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Carbon Activity</Text>
      <Text style={styles.subtitle}>Select an activity to track its carbon footprint</Text>
      
      <ScrollView style={styles.activitiesList}>
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={[
              styles.activityItem,
              selectedActivity?.id === activity.id && styles.selectedActivity,
            ]}
            onPress={() => handleSelectActivity(activity)}
          >
            <View style={styles.activityIcon}>{activity.icon}</View>
            <View style={styles.activityContent}>
              <Text style={styles.activityName}>{activity.name}</Text>
              <Text style={styles.activityCarbon}>
                {activity.carbonAmount === 0
                  ? 'Carbon neutral'
                  : `${activity.carbonAmount.toFixed(1)} kg CO₂`}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Cancel"
          onPress={() => router.back()}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Add Activity"
          onPress={handleAddActivity}
          disabled={!selectedActivity}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  activitiesList: {
    flex: 1,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedActivity: {
    borderColor: theme.colors.primary,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    ...theme.typography.body,
    fontWeight: '500',
    marginBottom: theme.spacing.xs,
  },
  activityCarbon: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  button: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
});