import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/Colors';
import { Recipe, useRecipes } from '../../context/recipe_context';

export default function Index() {
  const router = useRouter();
  const { recipes, loading } = useRecipes();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.newRecipe} onPress={() => router.push('/add-recipe')}>
        <Text style={styles.buttonText}>+ Add a Recipe</Text>
      </Pressable>

      {loading ? (
        <ActivityIndicator color={Colors.volsOrange} />
      ) : recipes.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="restaurant-outline" size={40} color={Colors.textMuted} />
          <Text style={styles.emptyText}>No recipes yet. Add your first one!</Text>
        </View>
      ) : (
        <View style={styles.recipeList}>
          {recipes.map((item) => (
            <RecipeBox key={item.id} recipe={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function RecipeBox({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const { id, title, image } = recipe;

  return (
    <Pressable 
      style={styles.recipeCard} 
      onPress={() => router.push({ pathname: '/recipe-detail', params: { id: String(id) } })}
    >
      <ImageBackground
        source={image ? { uri: image } : undefined}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['rgba(24, 28, 36, 0.0)', 'rgba(22, 22, 22, 1)']} 
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
  emptyState: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textMuted,
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