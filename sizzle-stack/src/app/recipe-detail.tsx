import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import IngredientList from '../components/recipes/IngredientList';
import RecipeHeroImage from '../components/recipes/RecipeHeroImage';
import BottomBar from '../components/ui/BottomBar';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useGrocery, useRecipes } from '../context/recipe_context';
import { useRecipeImageUpload } from '../hooks/useRecipeImageUpload';

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
        <Text style={styles.notFound}>Recipe not found.</Text>
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
          <Text style={styles.title}>{recipe.title}</Text>
          <Text>{recipe.instructions}</Text>
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
  notFound: { padding: 20, fontSize: 16 },
  content: { paddingHorizontal: 20 },
  title: { fontWeight: "bold", fontSize: 18 },
});
