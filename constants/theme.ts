import { StyleSheet } from 'react-native';
import Colors from './colors';

export const theme = {
  colors: Colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    round: 9999,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.text,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.text,
    },
    h3: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.text,
    },
    body: {
      fontSize: 16,
      color: Colors.text,
    },
    bodySmall: {
      fontSize: 14,
      color: Colors.textSecondary,
    },
    caption: {
      fontSize: 12,
      color: Colors.textSecondary,
    },
  },
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
});