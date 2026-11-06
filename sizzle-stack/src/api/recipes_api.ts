import { Recipe } from '../context/recipe_context';
import { normalizeUnit } from '../utils/ingredients';

const SEARCH_URL = 'https://dominicdodge.com/sizzle/search.php';
const CUISINE_URL = 'https://dominicdodge.com/sizzle/cuisine.php';

// Keep in sync with $allowedCuisines in server/cuisine.php.
export const CUISINES = ['Mexican', 'Asian', 'Southern', 'Italian', 'Indian', 'Mediterranean', 'Thai'];

interface SpoonacularRecipe {
  id: number;
  title: string;
  image?: string;
  readyInMinutes?: number;
  servings?: number;
  extendedIngredients?: { name: string; measures: { us: { amount: number; unitShort: string } } }[];
  analyzedInstructions?: { steps: { step: string }[] }[];
}

export async function searchRecipes(query: string): Promise<Recipe[]> {
  const res = await fetch(`${SEARCH_URL}?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data: { results: SpoonacularRecipe[] } = await res.json();
  return keepForDetailScreen(data.results.map(toRecipe));
}

// Random recipes for one cuisine, so each call can return different meals.
export async function getRecipesByCuisine(cuisine: string): Promise<Recipe[]> {
  const res = await fetch(`${CUISINE_URL}?cuisine=${encodeURIComponent(cuisine.toLowerCase())}`);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data: { recipes: SpoonacularRecipe[] } = await res.json();
  return keepForDetailScreen(data.recipes.map(toRecipe));
}

function keepForDetailScreen(recipes: Recipe[]) {
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
