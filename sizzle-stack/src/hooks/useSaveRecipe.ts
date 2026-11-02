import { useState } from 'react';
import { Alert } from 'react-native';
import { Recipe, useRecipes } from '../context/recipe_context';
import { prepareRecipe } from '../utils/recipes';

// Saves a Discover recipe to the user's recipes, prepared the same way as the add-recipe form.
// A recipe counts as saved when one with the same title exists.
export function useSaveRecipe(recipe?: Recipe) {
  const { recipes, addRecipe } = useRecipes();
  const [saving, setSaving] = useState(false);
  const saved = !!recipe && recipes.some((r) => r.title.trim() === recipe.title.trim());

  const save = async () => {
    if (!recipe || saved || saving) return;

    // Spoonacular's id is left out so the database assigns a local one.
    const newRecipe = prepareRecipe({
      title: recipe.title,
      image: recipe.image,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      readyInMinutes: recipe.readyInMinutes?.toString() ?? '',
      servings: recipe.servings?.toString() ?? '',
    });
    if (!newRecipe) {
      Alert.alert('Could not save recipe', 'This recipe is missing a title, ingredients or instructions.');
      return;
    }

    setSaving(true);
    try {
      await addRecipe(newRecipe);
    } catch (e) {
      console.warn('Failed to save recipe', e);
      Alert.alert('Could not save recipe', e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return { saved, saving, save };
}
