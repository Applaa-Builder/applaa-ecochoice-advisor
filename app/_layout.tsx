import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";

// Create a client
const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: '#F5F8F5',
          },
          headerTintColor: '#263238',
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: '#F5F8F5',
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="tip/[id]" 
          options={{ 
            title: "Sustainability Tip",
            animation: "slide_from_right",
          }} 
        />
        <Stack.Screen 
          name="product/[id]" 
          options={{ 
            title: "Eco Product",
            animation: "slide_from_right",
          }} 
        />
        <Stack.Screen 
          name="recipe/[id]" 
          options={{ 
            title: "Sustainable Recipe",
            animation: "slide_from_right",
          }} 
        />
        <Stack.Screen 
          name="carbon/add" 
          options={{ 
            title: "Add Carbon Activity",
            presentation: "modal",
          }} 
        />
      </Stack>
    </>
  );
}