import { Ingredient, NewRecipe } from '../context/recipe_context';

// The recipe fields as text, the way the add-recipe form holds them.
export interface RecipeFields {
  title: string;
  image: string;
  ingredients: Ingredient[];
  instructions: string;
  readyInMinutes: string;
  servings: string;
}

// Cleans up recipe fields for saving. Returns null when a required field is missing.
// Used by the add-recipe form and by saving a Discover recipe, so both save the same way.
export function prepareRecipe(fields: RecipeFields): NewRecipe | null {
  const title = fields.title.trim();
  const instructions = fields.instructions.trim();
  const ingredients = fields.ingredients.filter((item) => item.name.trim() !== '');
  if (!title || !instructions || ingredients.length === 0) return null;

  return {
    title,
    image: fields.image,
    ingredients,
    instructions,
    readyInMinutes: toCount(fields.readyInMinutes),
    servings: toCount(fields.servings),
  };
}

const toCount = (text: string) => {
  const n = parseInt(text, 10);
  return n > 0 ? n : null;
};
