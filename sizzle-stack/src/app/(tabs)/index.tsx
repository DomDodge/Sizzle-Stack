import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/Colors';
import { Ingredient, useRecipes } from '../../context/recipe_context';

const FOOD_IMAGES: Record<string, any> = {
  'rice.jpg': require('../../../assets/food-images/rice.jpg'),
  'taco.jpg': require('../../../assets/food-images/taco.jpg'),
};

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
          <RecipeBox 
            key={item.title} 
            title={item.title} 
            instructions={item.instructions} 
            ingredients={item.ingredients} 
            image={item.image} 
          />
        ))}
      </View>
    </ScrollView>
  );
}

function RecipeBox({ title, instructions, ingredients, image }: { title: string, instructions: string, ingredients: Ingredient[], image: string }) {
  const router = useRouter();
  
  const imageSource = FOOD_IMAGES[image] ?? { uri: image };

  return (
    <Pressable 
      style={styles.recipeCard} 
      onPress={() => router.push({ pathname: '/recipe-detail', params: { title, instructions, image: image, ingredients: JSON.stringify(ingredients) } })}
    >
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['rgba(24, 28, 36, 0.0)', Colors.mintGreen]} 
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientOverlay}
        >
          <Text style={styles.recipeText}>{title}</Text>
        </LinearGradient>
      </ImageBackground>
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
  recipeCard: {
    width: "47%",
    height: 115,
    backgroundColor: Colors.mintGreen,
    borderRadius: 12,
    overflow: "hidden", 
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end", // Aligns overlay container to bottom
  },
  imageStyle: {
    borderRadius: 12,
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",  // Pins text to left
  },
  recipeText: {
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF", // White text contrast against image
  },
});