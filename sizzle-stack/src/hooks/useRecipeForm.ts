import { useState } from 'react';
import { Alert } from 'react-native';
import { Ingredient, Recipe, useRecipes } from '../context/recipe_context';
import { emptyIngredient } from '../utils/ingredients';
import { prepareRecipe } from '../utils/recipes';

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

  const recipe = prepareRecipe({ title, image, ingredients, instructions, readyInMinutes, servings });
  const isFormValid = !!recipe && !saving;

  const submit = async () => {
    if (!recipe || saving) return;

    setSaving(true);
    try {
      await (existing ? updateRecipe(existing.id, recipe) : addRecipe(recipe));
      onSaved();
    } catch (e) {
      console.warn('Failed to save recipe', e);
      Alert.alert('Could not save recipe', e instanceof Error ? e.message : String(e));
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

export type RecipeFormState = ReturnType<typeof useRecipeForm>;
