import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from "react-native";
import IngredientList from '../components/recipes/IngredientList';
import RecipeHeroImage from '../components/recipes/RecipeHeroImage';
import BottomBar from '../components/ui/BottomBar';
import HeaderButton from '../components/ui/HeaderButton';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useGrocery, useRecipes } from '../context/recipe_context';
import { useRecipeImageUpload } from '../hooks/useRecipeImageUpload';
import { AppText } from '../components/AppText';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recipes } = useRecipes();
  const { addItems } = useGrocery();
  const { uploading, changeImage } = useRecipeImageUpload(Number(id));
  const router = useRouter();

  const recipe = recipes.find((r) => r.id === Number(id));

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
        options={{ headerRight: () => <HeaderButton icon="create-outline" label="Edit" onPress={editRecipe} /> }}
      />

      <ScrollView style={styles.scrolling}>
        <RecipeHeroImage image={recipe.image} uploading={uploading} onPress={changeImage} />
        <View style={styles.content}>
          <AppText variant="screenTitle" style={styles.title}>{recipe.title}</AppText>
          <AppText>{recipe.instructions}</AppText>
          <AppText variant="sectionTitle" style={styles.heading}>Ingredients</AppText>
          <IngredientList ingredients={recipe.ingredients} />
        </View>
      </ScrollView>

      <BottomBar>
        <PrimaryButton label="Add To Grocery List" onPress={addToList} />
      </BottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 20 },
  scrolling: { paddingBottom: 90 },
  notFound: { padding: 20 },
  content: { paddingHorizontal: 20 },
  title: { marginTop: 16, marginBottom: 8 },
  heading: { marginTop: 24, marginBottom: 8 },
});
