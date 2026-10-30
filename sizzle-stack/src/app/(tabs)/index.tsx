import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import RecipeGrid from '../../components/recipes/RecipeGrid';
import EmptyState from '../../components/ui/EmptyState';
import FloatingButton from '../../components/ui/FloatingButton';
import { Colors } from '../../constants/Colors';
import { useRecipes } from '../../context/recipe_context';

export default function Index() {
  const router = useRouter();
  const { recipes, loading } = useRecipes();

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator color={Colors.volsOrange} />
        ) : recipes.length === 0 ? (
          <EmptyState icon="restaurant-outline" message="No recipes yet. Tap + to add your first one!" style={styles.empty} />
        ) : (
          <RecipeGrid recipes={recipes} />
        )}
      </ScrollView>

      <FloatingButton icon="add" label="Add a recipe" onPress={() => router.push('/add-recipe')} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  // Extra bottom padding so the last row of cards can scroll out from under the + button.
  container: { padding: 20, paddingBottom: 100, gap: 20 },
  empty: { paddingVertical: 40 },
});
