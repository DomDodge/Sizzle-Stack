import { useState } from 'react';
import { Alert } from 'react-native';
import { Ingredient, useRecipes } from '../context/recipe_context';
import { emptyIngredient } from '../utils/ingredients';

// Holds the add-recipe form state and saves it to the database.
export function useRecipeForm(onSaved: () => void) {
  const { addRecipe } = useRecipes();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([emptyIngredient()]);
  const [instructions, setInstructions] = useState('');
  const [saving, setSaving] = useState(false);

  // Validation: Title present, at least one ingredient with a non-empty name, and instructions present
  const isFormValid =
    title.trim().length > 0 &&
    ingredients.some((item) => item.name.trim().length > 0) &&
    instructions.trim().length > 0 &&
    !saving;

  const submit = async () => {
    if (!isFormValid) return;

    setSaving(true);
    try {
      await addRecipe({
        title: title.trim(),
        ingredients: ingredients.filter((item) => item.name.trim() !== ''),
        image,
        instructions: instructions.trim(),
      });
      onSaved();
    } catch (e) {
      console.warn('Failed to save recipe', e);
      Alert.alert('Could not save recipe', 'Please try again.');
      setSaving(false);
    }
  };

  return {
    title, setTitle,
    image, setImage,
    ingredients, setIngredients,
    instructions, setInstructions,
    saving, isFormValid, submit,
  };
}

export type RecipeFormState = ReturnType<typeof useRecipeForm>;
