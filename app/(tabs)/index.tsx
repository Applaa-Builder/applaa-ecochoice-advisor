import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Link, router } from 'expo-router';
import { Leaf, TrendingUp, Award } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import { useUserStore } from '@/store/userStore';
import { useCarbonStore } from '@/store/carbonStore';
import Button from '@/components/Button';
import SustainabilityTipCard from '@/components/SustainabilityTipCard';
import ProgressChart from '@/components/ProgressChart';
import { sustainabilityTips } from '@/mocks/sustainabilityTips';

export default function HomeScreen() {
  const { profile } = useUserStore();
  const { getTotalCarbonFootprint } = useCarbonStore();
  const [featuredTip, setFeaturedTip] = useState(sustainabilityTips[0]);
  
  // Get a random tip on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sustainabilityTips.length);
    setFeaturedTip(sustainabilityTips[randomIndex]);
  }, []);

  const totalCarbonFootprint = getTotalCarbonFootprint();
  
  // Mock data for progress chart
  const progressData = [
    {
      value: profile.sustainabilityScore,
      target: 100,
      label: 'Eco Score',
      color: theme.colors.primary,
    },
    {
      value: Math.max(0, 100 - totalCarbonFootprint),
      target: 100,
      label: 'Carbon Reduction',
      color: theme.colors.success,
    },
    {
      value: profile.completedChallenges,
      target: 10,
      label: 'Challenges',
      color: theme.colors.accent,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' }}
          style={styles.headerImage}
        />
        <View style={styles.headerOverlay}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.appTitle}>EcoLife Assistant</Text>
          <Text style={styles.appSubtitle}>Your guide to sustainable living</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Leaf size={24} color={theme.colors.primary} />
          <Text style={styles.statValue}>{profile.sustainabilityScore}</Text>
          <Text style={styles.statLabel}>Eco Score</Text>
        </View>
        <View style={styles.statCard}>
          <TrendingUp size={24} color={theme.colors.success} />
          <Text style={styles.statValue}>{totalCarbonFootprint.toFixed(1)}</Text>
          <Text style={styles.statLabel}>kg CO₂</Text>
        </View>
        <View style={styles.statCard}>
          <Award size={24} color={theme.colors.accent} />
          <Text style={styles.statValue}>{profile.completedChallenges}</Text>
          <Text style={styles.statLabel}>Challenges</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Sustainability Progress</Text>
        <ProgressChart data={progressData} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tip of the Day</Text>
        <SustainabilityTipCard tip={featuredTip} />
        <Link href="/tips" asChild>
          <Button 
            title="See More Tips" 
            variant="outline" 
            style={styles.seeMoreButton} 
            onPress={() => {}}
          />
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <Link href="/carbon/add" asChild>
            <Button 
              title="Log Carbon Activity" 
              style={styles.actionButton} 
              onPress={() => {}}
            />
          </Link>
          <Link href="/assistant" asChild>
            <Button 
              title="Ask Eco Assistant" 
              variant="secondary" 
              style={styles.actionButton} 
              onPress={() => {}}
            />
          </Link>
        </View>
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
  header: {
    height: 200,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  welcomeText: {
    color: 'white',
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  appTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  appSubtitle: {
    color: 'white',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    marginTop: -theme.spacing.xl,
  },
  statCard: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
    width: '30%',
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    ...theme.typography.h2,
    marginVertical: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    textAlign: 'center',
  },
  section: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    marginBottom: theme.spacing.md,
  },
  seeMoreButton: {
    marginTop: theme.spacing.sm,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
});