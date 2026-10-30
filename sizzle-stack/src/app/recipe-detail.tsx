import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from "react-native";
import { getSearchedRecipe } from '../api/recipes_api';
import IngredientList from '../components/recipes/IngredientList';
import RecipeHeroImage from '../components/recipes/RecipeHeroImage';
import BottomBar from '../components/ui/BottomBar';
import HeaderButton from '../components/ui/HeaderButton';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useGrocery, useRecipes } from '../context/recipe_context';
import { useRecipeImageUpload } from '../hooks/useRecipeImageUpload';
import { useSaveRecipe } from '../hooks/useSaveRecipe';
import { AppText } from '../components/AppText';

// Shows a saved recipe, or a Discover search result when opened with source=discover.
export default function RecipeDetails() {
  const { id, source } = useLocalSearchParams<{ id: string; source?: string }>();
  const fromDiscover = source === 'discover';
  const { recipes } = useRecipes();
  const { addItems } = useGrocery();
  const { uploading, changeImage } = useRecipeImageUpload(Number(id));
  const router = useRouter();

  // Discover ids are Spoonacular's and can't be looked up among saved recipes.
  const recipe = fromDiscover ? getSearchedRecipe(Number(id)) : recipes.find((r) => r.id === Number(id));
  const { saved, saving, save } = useSaveRecipe(recipe);
  const meta = recipe && [
    recipe.readyInMinutes && `${recipe.readyInMinutes} min`,
    recipe.servings && `Serves ${recipe.servings}`,
  ].filter(Boolean).join('  ·  ');

  if (!recipe) {
    return (
      <View style={styles.container}>
        <AppText style={styles.notFound}>Recipe not found.</AppText>
      </View>
    );
  }

  const addToList = () => {
    addItems(recipe.ingredients);
    router.back();
  };

  // Reuses the add-recipe screen, pre-filled with this recipe.
  const editRecipe = () => router.push({ pathname: '/add-recipe', params: { id: String(recipe.id) } });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: fromDiscover ? undefined : () => <HeaderButton icon="create-outline" label="Edit" onPress={editRecipe} />,
        }}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: fromDiscover ? 160 : 100 }}>
        <RecipeHeroImage image={recipe.image} uploading={uploading} onPress={fromDiscover ? undefined : changeImage} />
        <View style={styles.content}>
          <AppText variant="screenTitle" style={styles.title}>{recipe.title}</AppText>
          {!!meta && <AppText variant="secondary" style={styles.meta}>{meta}</AppText>}
          <AppText>{recipe.instructions}</AppText>
          <AppText variant="sectionTitle" style={styles.heading}>Ingredients</AppText>
          <IngredientList ingredients={recipe.ingredients} />
        </View>
      </ScrollView>

      <BottomBar>
        {fromDiscover && (
          <PrimaryButton label={saved ? 'Saved to My Recipes' : 'Save Recipe'} onPress={save} disabled={saved || saving} />
        )}
        <PrimaryButton label="Add To Grocery List" onPress={addToList} />
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20 },
  notFound: { padding: 20 },
  content: { paddingHorizontal: 20 },
  title: { marginTop: 16, marginBottom: 8 },
  meta: { marginBottom: 12 },
  heading: { marginTop: 24, marginBottom: 8 },
});
