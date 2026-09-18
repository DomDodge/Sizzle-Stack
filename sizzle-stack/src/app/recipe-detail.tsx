import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import { Colors } from '../constants/Colors';
import type { Ingredient } from '../context/recipe_context';

export default function RecipeDetails() {
  const { title, instructions, ingredients } = useLocalSearchParams<{
    title: string;
    instructions: string;
    ingredients: string;
  }>();

  let parsedIngredients: Ingredient[] = [];

  try {
    parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
  } catch (e) {
    console.warn('Failed to parse ingredients param', e);
  }

  return (
      <View style={styles.container}>
          <View style={styles.imageHeader}></View>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{title || "food-name"}</Text>
            <Text>
              {instructions}
            </Text>

            {parsedIngredients.map((ing, idx) => (
              <Text key={idx}>
                {ing.amount} {ing.unit} {ing.name}
              </Text>
            ))}
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  imageHeader: {
    backgroundColor: Colors.mintGreen,
    width: "100%",
    height: 200,
  },
  innerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  }
});