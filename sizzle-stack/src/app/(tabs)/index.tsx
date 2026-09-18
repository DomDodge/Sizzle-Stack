import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/Colors';
import { Ingredient, useRecipes } from '../../context/recipe_context';


export default function Index() {
  const router = useRouter();
  const { recipes } = useRecipes();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.newRecipe} onPress={() => router.push('/add-recipe')}>
        <Text style={styles.buttonText}>+ Add a Recipe</Text>
      </Pressable>

      <View style={styles.recipeList}>
        {recipes.map((item) => (
          <RecipeBox key={item.title} title={item.title} instructions={item.instructions} ingredients={item.ingredients} />
        ))}
      </View>
    </ScrollView>
  );
}

function RecipeBox({ title, instructions, ingredients }: { title: string, instructions: string, ingredients: Ingredient[] }) {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.recipe} 
      onPress={() => router.push({ pathname: '/recipe-detail', params: { title, instructions, ingredients: JSON.stringify(ingredients) } })}
    >
      <Text style={styles.recipeText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  newRecipe: {
    backgroundColor: Colors.volsOrange,
    width: "100%",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  recipeList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  recipe: {
    width: "47%",
    height: 115,
    backgroundColor: Colors.mintGreen,
    borderRadius: 12,
    padding: 12,
    justifyContent: "flex-end",
  },
  recipeText: {
    fontWeight: "600",
    fontSize: 16,
  },
});