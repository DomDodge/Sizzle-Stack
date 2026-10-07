import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { pickRecipeImage } from '../components/ImageInput';
import { Colors } from '../constants/Colors';
import { useGrocery, useRecipes } from '../context/recipe_context';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recipes, updateRecipeImage } = useRecipes();
  const { addItems } = useGrocery();
  const [uploading, setUploading] = useState(false);
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
  }

  const handleChangeImage = async () => {
    const uri = await pickRecipeImage();
    if (!uri) return;

    setUploading(true);
    try {
      await updateRecipeImage(recipe.id, uri);
    } catch (e) {
      console.warn('Failed to update recipe image', e);
      Alert.alert('Could not save photo', 'Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolling}>
          <Pressable onPress={handleChangeImage} disabled={uploading}>
            <ImageBackground
              source={recipe.image ? { uri: recipe.image } : undefined}
              style={styles.imageHeader}
            >
              {uploading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <View style={styles.photoBadge}>
                  <Ionicons name="camera" size={16} color="#FFF" />
                  <Text style={styles.photoBadgeText}>{recipe.image ? 'Change Photo' : 'Add Photo'}</Text>
                </View>
              )}
            </ImageBackground>
          </Pressable>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text>
              {recipe.instructions}
            </Text>

            <View style={styles.ingredients}>
              {recipe.ingredients.map((ing, idx) => (
                <View style={styles.ingred} key={idx}>
                  <Text>{ing.amount} {ing.unit} {ing.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
        
        <View style={styles.bottomBar}>
          <Pressable 
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
            onPress={addToList}
          >
            <Text style={styles.buttonText}>Add To Grocery List</Text>
          </Pressable>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
  },
  scrolling: {
    paddingBottom: 90,
  },
  notFound: {
    padding: 20,
    fontSize: 16,
  },
  imageHeader: {
    width: "100%",
    height: 200,
    backgroundColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBadge: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  photoBadgeText: {
    color: '#FFF',
    fontWeight: '600',
  },
  innerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  button: {
    backgroundColor: Colors.volsOrange,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  ingredients: {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    borderTopColor: 'black',
    borderTopWidth: 2,
  },
  ingred: {
    height: 30,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    display: 'flex',
    justifyContent: 'center',
  },
});
