import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from "react-native";
import IngredientList from '../components/recipes/IngredientList';
import RecipeHeroImage from '../components/recipes/RecipeHeroImage';
import BottomBar from '../components/ui/BottomBar';
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrolling}>
        <RecipeHeroImage image={recipe.image} uploading={uploading} onPress={changeImage} />
        <View style={styles.content}>
          <AppText variant="sectionTitle" style={styles.title}>{recipe.title}</AppText>
          <AppText>{recipe.instructions}</AppText>
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
  title: { marginBottom: 8 },
});
