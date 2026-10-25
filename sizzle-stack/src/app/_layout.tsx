// Imported per weight so only these five font files end up in the app bundle.
import { BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue/400Regular';
import { Roboto_400Regular } from '@expo-google-fonts/roboto/400Regular';
import { Roboto_500Medium } from '@expo-google-fonts/roboto/500Medium';
import { Roboto_600SemiBold } from '@expo-google-fonts/roboto/600SemiBold';
import { Roboto_700Bold } from '@expo-google-fonts/roboto/700Bold';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Fonts, headerTitleStyle } from '../constants/Typography';
import { GroceryProvider, RecipesProvider, restoreColorScheme, useColors } from '../context/recipe_context';

// Keep the splash screen up until the fonts are ready so text never flashes in the system font.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const c = useColors();
  useEffect(restoreColorScheme, []);

  // Keys are the fontFamily names used in constants/Typography.ts.
  const [loaded, error] = useFonts({
    [Fonts.display]: BebasNeue_400Regular,
    [Fonts.regular]: Roboto_400Regular,
    [Fonts.medium]: Roboto_500Medium,
    [Fonts.semibold]: Roboto_600SemiBold,
    [Fonts.bold]: Roboto_700Bold,
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
            headerTitleStyle,
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