import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerBackTitle: 'Back' }}>
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
  );
}