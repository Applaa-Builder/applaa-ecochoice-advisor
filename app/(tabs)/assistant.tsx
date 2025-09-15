import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { globalStyles } from '@/constants/theme';
import AIChat from '@/components/AIChat';

export default function AssistantScreen() {
  return (
    <View style={styles.container}>
      <AIChat initialMessage="Hello! I'm your sustainable living assistant. Ask me anything about eco-friendly choices, reducing your carbon footprint, or sustainable practices for your home, food, transportation, and more." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
});