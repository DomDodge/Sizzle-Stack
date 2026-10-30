import { Recipe } from '../context/recipe_context';
import { normalizeUnit } from '../utils/ingredients';

const BASE_URL = 'https://api.spoonacular.com';
// const API_KEY = process.env.EXPO_PUBLIC_RECIPE_API_KEY;
// Temporarilly putting this in plain text
// until assignment is graded.
const API_KEY = "4f7eaf4ee30f4445a6f3705337526191";

// The parts of a Spoonacular search result that we use.
interface SpoonacularRecipe {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  extendedIngredients?: { name: string; measures: { us: { amount: number; unitShort: string } } }[];
  analyzedInstructions?: { steps: { step: string }[] }[];
}

// Spoonacular recipe search: https://spoonacular.com/food-api/docs#Search-Recipes-Complex
// The extra flags include ingredients, steps, time and servings in each result.
export async function searchRecipes(query: string): Promise<Recipe[]> {
  const params = [
    `query=${encodeURIComponent(query)}`,
    'number=10',
    'addRecipeInformation=true',
    'fillIngredients=true',
    'instructionsRequired=true',
  ].join('&');
  const res = await fetch(`${BASE_URL}/recipes/complexSearch?${params}`, {
    headers: { 'x-api-key': API_KEY ?? '' },
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data: { results: SpoonacularRecipe[] } = await res.json();
  const recipes = data.results.map(toRecipe);
  recipes.forEach((r) => searchedRecipes.set(r.id, r));
  return recipes;
}

// Search results kept so the detail screen can show them by Spoonacular id.
const searchedRecipes = new Map<number, Recipe>();
export const getSearchedRecipe = (id: number) => searchedRecipes.get(id);

// Converts a Spoonacular result into the same shape as a saved recipe.
// The id is Spoonacular's, so it must not be used to look up saved recipes.
function toRecipe(r: SpoonacularRecipe): Recipe {
  const steps = (r.analyzedInstructions ?? []).flatMap((section) => section.steps);
  return {
    id: r.id,
    title: r.title,
    image: r.image ?? '',
    readyInMinutes: r.readyInMinutes ?? null,
    servings: r.servings ?? null,
    instructions: steps.map((s, i) => `${i + 1}. ${s.step}`).join('\n'),
    ingredients: (r.extendedIngredients ?? []).map(({ name, measures: { us } }) => ({
      amount: String(Math.round(us.amount * 100) / 100),
      unit: normalizeUnit(us.unitShort),
      name,
    })),
  };
}
