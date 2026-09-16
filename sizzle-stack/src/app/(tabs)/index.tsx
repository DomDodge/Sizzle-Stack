import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/Colors';

const tempData = [
  {
    name: "Lime Rice",
    instructions: "Cook for 1000 seconds on high",
    ingredients: [
      {measurment: 1, unit: "tablespoon", name: "borax"}
    ]
  },
  {
    name: "Tacos",
    instructions: "Cook for 10000 seconds on high",
    ingredients: [
      {measurment: 2, unit: "teaspoons", name: "borax"}
    ]
  },
  {
    name: "Pasta",
    instructions: "Cook for 100000 seconds on high",
    ingredients: [
      {measurment: 5, unit: "gallons", name: "borax"}
    ]
  }
]

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Pressable style={styles.newRecipe} onPress={() => router.push('/add-recipe')}>
        <Text style={styles.buttonText}>+ Add a Recipe</Text>
      </Pressable>

      <View style={styles.recipeList}>
        {tempData.map((item) => (
          <RecipeBox 
            key={item.name} 
            title={item.name}
            instructions={item.instructions}
          />
        ))}

      </View>
    </ScrollView>
  );
}

function RecipeBox({ title, instructions }: { title: string, instructions: string }) {
  const router = useRouter();

  return (
    <Pressable 
      style={styles.recipe} 
      onPress={() => router.push({ pathname: '/recipe-detail', params: { title, instructions } })}
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