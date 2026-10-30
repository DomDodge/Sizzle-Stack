import { useState } from 'react';
import { Alert } from 'react-native';
import { Recipe, useRecipes } from '../context/recipe_context';

// Saves a Discover recipe to the user's recipes. A recipe counts as saved when one with the same title exists.
export function useSaveRecipe(recipe?: Recipe) {
  const { recipes, addRecipe } = useRecipes();
  const [saving, setSaving] = useState(false);
  const saved = !!recipe && recipes.some((r) => r.title === recipe.title);

  const save = async () => {
    if (!recipe || saved) return;
    setSaving(true);
    try {
      // Drop Spoonacular's id so the database assigns a local one.
      const { id, ...newRecipe } = recipe;
      await addRecipe(newRecipe);
    } catch (e) {
      console.warn('Failed to save recipe', e);
      Alert.alert('Could not save recipe', 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return { saved, saving, save };
}
