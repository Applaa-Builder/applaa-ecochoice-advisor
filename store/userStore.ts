import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '@/types';

interface UserState {
  profile: UserProfile;
  updateSustainabilityScore: (score: number) => void;
  incrementCompletedChallenges: () => void;
  saveTip: (tipId: string) => void;
  removeSavedTip: (tipId: string) => void;
  saveRecipe: (recipeId: string) => void;
  removeSavedRecipe: (recipeId: string) => void;
  updateCarbonFootprint: (amount: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: {
        sustainabilityScore: 0,
        completedChallenges: 0,
        savedTips: [],
        savedRecipes: [],
        carbonFootprint: 0,
      },
      updateSustainabilityScore: (score) =>
        set((state) => ({
          profile: {
            ...state.profile,
            sustainabilityScore: score,
          },
        })),
      incrementCompletedChallenges: () =>
        set((state) => ({
          profile: {
            ...state.profile,
            completedChallenges: state.profile.completedChallenges + 1,
          },
        })),
      saveTip: (tipId) =>
        set((state) => ({
          profile: {
            ...state.profile,
            savedTips: [...state.profile.savedTips, tipId],
          },
        })),
      removeSavedTip: (tipId) =>
        set((state) => ({
          profile: {
            ...state.profile,
            savedTips: state.profile.savedTips.filter((id) => id !== tipId),
          },
        })),
      saveRecipe: (recipeId) =>
        set((state) => ({
          profile: {
            ...state.profile,
            savedRecipes: [...state.profile.savedRecipes, recipeId],
          },
        })),
      removeSavedRecipe: (recipeId) =>
        set((state) => ({
          profile: {
            ...state.profile,
            savedRecipes: state.profile.savedRecipes.filter((id) => id !== recipeId),
          },
        })),
      updateCarbonFootprint: (amount) =>
        set((state) => ({
          profile: {
            ...state.profile,
            carbonFootprint: state.profile.carbonFootprint + amount,
          },
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);