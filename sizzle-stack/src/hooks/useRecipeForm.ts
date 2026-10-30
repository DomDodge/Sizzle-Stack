import { useState } from 'react';
import { Alert } from 'react-native';
import { Ingredient, Recipe, useRecipes } from '../context/recipe_context';
import { emptyIngredient } from '../utils/ingredients';

// Holds the recipe form state and saves it to the database.
// Pass an existing recipe to edit it instead of creating a new one.
export function useRecipeForm(onSaved: () => void, existing?: Recipe) {
  const { addRecipe, updateRecipe } = useRecipes();
  const [title, setTitle] = useState(existing?.title ?? '');
  const [image, setImage] = useState(existing?.image ?? '');
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    existing?.ingredients.length ? existing.ingredients : [emptyIngredient()]
  );
  const [instructions, setInstructions] = useState(existing?.instructions ?? '');
  const [readyInMinutes, setReadyInMinutes] = useState(existing?.readyInMinutes?.toString() ?? '');
  const [servings, setServings] = useState(existing?.servings?.toString() ?? '');
  const [saving, setSaving] = useState(false);

  const isFormValid =
    title.trim().length > 0 &&
    ingredients.some((item) => item.name.trim().length > 0) &&
    instructions.trim().length > 0 &&
    !saving;

  const submit = async () => {
    if (!isFormValid) return;

    setSaving(true);
    try {
      const recipe = {
        title: title.trim(),
        ingredients: ingredients.filter((item) => item.name.trim() !== ''),
        image,
        instructions: instructions.trim(),
        readyInMinutes: toCount(readyInMinutes),
        servings: toCount(servings),
      };
      await (existing ? updateRecipe(existing.id, recipe) : addRecipe(recipe));
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
    readyInMinutes, setReadyInMinutes,
    servings, setServings,
    saving, isFormValid, submit,
  };
}

const toCount = (text: string) => {
  const n = parseInt(text, 10);
  return n > 0 ? n : null;
};

export type RecipeFormState = ReturnType<typeof useRecipeForm>;
