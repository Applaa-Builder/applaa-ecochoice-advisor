import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { useCarbonStore } from '@/store/carbonStore';
import CarbonActivityCard from '@/components/CarbonActivityCard';
import ProgressChart from '@/components/ProgressChart';

export default function CarbonScreen() {
  const router = useRouter();
  const { activities, removeActivity, getTotalCarbonFootprint } = useCarbonStore();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    if (!acc[activity.date]) {
      acc[activity.date] = [];
    }
    acc[activity.date].push(activity);
    return acc;
  }, {} as Record<string, typeof activities>);

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  // Calculate total carbon for each date
  const dateCarbon = sortedDates.map(date => {
    const total = groupedActivities[date].reduce(
      (sum, activity) => sum + activity.carbonAmount, 
      0
    );
    return { date, total };
  });

  const handleAddActivity = () => {
    router.push('/carbon/add');
  };

  const handleDeleteActivity = (id: string) => {
    removeActivity(id);
  };

  const totalCarbon = getTotalCarbonFootprint();
  
  // Progress chart data
  const progressData = [
    {
      value: Math.max(0, 100 - totalCarbon),
      target: 100,
      label: 'Carbon Budget Remaining',
      color: theme.colors.success,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Carbon Footprint</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddActivity}>
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Your Carbon Impact</Text>
        <Text style={styles.carbonTotal}>{totalCarbon.toFixed(1)} <Text style={styles.unit}>kg CO₂</Text></Text>
        <ProgressChart data={progressData} />
      </View>

      <Text style={styles.sectionTitle}>Recent Activities</Text>

      <FlatList
        data={sortedDates}
        keyExtractor={(date) => date}
        renderItem={({ item: date }) => (
          <View style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{date}</Text>
            {groupedActivities[date].map((activity) => (
              <CarbonActivityCard
                key={activity.id}
                activity={activity}
                onDelete={() => handleDeleteActivity(activity.id)}
              />
            ))}
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    padding: theme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    width: 44,
    height: 44,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    ...globalStyles.card,
    marginBottom: theme.spacing.lg,
  },
  summaryTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.sm,
  },
  carbonTotal: {
    ...theme.typography.h1,
    fontSize: 36,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  unit: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  dateGroup: {
    marginBottom: theme.spacing.lg,
  },
  dateHeader: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: theme.spacing.sm,
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
  },
});