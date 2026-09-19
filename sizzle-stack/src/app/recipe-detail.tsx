import { useLocalSearchParams } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import type { Ingredient } from '../context/recipe_context';

export default function RecipeDetails() {
  const { title, instructions, ingredients, image } = useLocalSearchParams<{
    title: string;
    instructions: string;
    ingredients: string;
    image: string
  }>();

  const FOOD_IMAGES: Record<string, any> = {
    'rice.jpg': require('../../assets/food-images/rice.jpg'),
    'taco.jpg': require('../../assets/food-images/taco.jpg'),
  };

  let parsedIngredients: Ingredient[] = [];

  try {
    parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
  } catch (e) {
    console.warn('Failed to parse ingredients param', e);
  }

  return (
      <View style={styles.container}>
          <ImageBackground 
            source={FOOD_IMAGES[image]}
            style={styles.imageHeader}
          />
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