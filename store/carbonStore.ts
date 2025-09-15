import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CarbonActivity } from '@/types';
import { carbonActivities } from '@/mocks/carbonActivities';

interface CarbonState {
  activities: CarbonActivity[];
  addActivity: (activity: Omit<CarbonActivity, 'id'>) => void;
  removeActivity: (id: string) => void;
  getTotalCarbonFootprint: () => number;
  getDailyCarbonFootprint: (date: string) => number;
}

export const useCarbonStore = create<CarbonState>()(
  persist(
    (set, get) => ({
      activities: carbonActivities,
      addActivity: (activity) =>
        set((state) => ({
          activities: [
            ...state.activities,
            {
              ...activity,
              id: Date.now().toString(),
            },
          ],
        })),
      removeActivity: (id) =>
        set((state) => ({
          activities: state.activities.filter((activity) => activity.id !== id),
        })),
      getTotalCarbonFootprint: () => {
        const { activities } = get();
        return activities.reduce((total, activity) => total + activity.carbonAmount, 0);
      },
      getDailyCarbonFootprint: (date) => {
        const { activities } = get();
        return activities
          .filter((activity) => activity.date === date)
          .reduce((total, activity) => total + activity.carbonAmount, 0);
      },
    }),
    {
      name: 'carbon-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);