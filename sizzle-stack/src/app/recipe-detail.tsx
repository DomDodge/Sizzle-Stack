import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { pickRecipeImage } from '../components/ImageInput';
import { useRecipes } from '../context/recipe_context';

export default function RecipeDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { recipes, updateRecipeImage } = useRecipes();
  const [uploading, setUploading] = useState(false);

  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Recipe not found.</Text>
      </View>
    );
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
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 20,
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
