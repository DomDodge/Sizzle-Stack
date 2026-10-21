import { useRouter } from "expo-router";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import RecipeGrid from '../../components/recipes/RecipeGrid';
import EmptyState from '../../components/ui/EmptyState';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Typography';
import { useRecipes } from '../../context/recipe_context';

export default function Index() {
  const router = useRouter();
  const { recipes, loading } = useRecipes();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PrimaryButton
        label="+ Add a Recipe"
        onPress={() => router.push('/add-recipe')}
        style={styles.addButton}
        textStyle={styles.addButtonText}
      />

      {loading ? (
        <ActivityIndicator color={Colors.volsOrange} />
      ) : recipes.length === 0 ? (
        <EmptyState icon="restaurant-outline" message="No recipes yet. Add your first one!" style={styles.empty} />
      ) : (
        <RecipeGrid recipes={recipes} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20 },
  addButton: { height: 60, paddingVertical: 0, borderRadius: 12 },
  addButtonText: { fontFamily: Fonts.bold, fontSize: 18 },
  empty: { paddingVertical: 40 },
});
