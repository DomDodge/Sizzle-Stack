import { useState } from 'react';
import { Alert } from 'react-native';
import { useRecipes } from '../context/recipe_context';
import { pickRecipeImage } from '../utils/pickRecipeImage';

// Lets the user pick a new photo for an existing recipe and saves it.
export function useRecipeImageUpload(recipeId: number) {
  const { updateRecipeImage } = useRecipes();
  const [uploading, setUploading] = useState(false);

  const changeImage = async () => {
    const uri = await pickRecipeImage();
    if (!uri) return;

    setUploading(true);
    try {
      await updateRecipeImage(recipeId, uri);
    } catch (e) {
      console.warn('Failed to update recipe image', e);
      Alert.alert('Could not save photo', 'Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return { uploading, changeImage };
}
