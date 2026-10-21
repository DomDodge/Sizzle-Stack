// Imported per weight so only these four font files end up in the app bundle.
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Fonts } from '../constants/Typography';
import { GroceryProvider, RecipesProvider, restoreColorScheme, useColors } from '../context/recipe_context';

// Keep the splash screen up until the fonts are ready so text never flashes in the system font.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const c = useColors();
  useEffect(restoreColorScheme, []);

  // Keys are the fontFamily names used in constants/Typography.ts.
  const [loaded, error] = useFonts({
    [Fonts.crafty]: require('../../assets/fonts/BalsamiqSans-Regular.ttf'),
    [Fonts.craftyBold]: require('../../assets/fonts/BalsamiqSans-Bold.ttf'),
    [Fonts.regular]: Inter_400Regular,
    [Fonts.medium]: Inter_500Medium,
    [Fonts.semibold]: Inter_600SemiBold,
    [Fonts.bold]: Inter_700Bold,
  });

  useEffect(() => {
    if (error) console.warn('Failed to load fonts', error);
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  // If loading fails, carry on with the system font rather than hanging on the splash screen.
  if (!loaded && !error) return null;

  return (
    <RecipesProvider>
      <GroceryProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            headerBackTitle: 'Back',
            headerTitleStyle: { fontFamily: Fonts.craftyBold },
            headerStyle: { backgroundColor: c.surface },
            headerTintColor: c.text,
            contentStyle: { backgroundColor: c.background },
          }}
        >
          {/* Main Tab Navigation */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Pop-up Card / Modal for Adding a Recipe */}
          <Stack.Screen
            name="add-recipe"
            options={{
              presentation: 'modal',
              headerShown: true,
              title: 'Add New Recipe',
            }}
          />

          {/* Pop-up Card / Stack Screen for Viewing Details */}
          <Stack.Screen
            name="recipe-detail"
            options={{
              presentation: 'card',
              headerShown: true,
              title: 'Recipe Details',
            }}
          />
        </Stack>
      </GroceryProvider>
    </RecipesProvider>
  );
}