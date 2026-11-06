import { useRef, useState } from 'react';
import { getRecipesByCuisine, searchRecipes } from '../api/recipes_api';
import { Recipe } from '../context/recipe_context';

// Runs recipe requests on demand and tracks their result, loading and error state.
export function useDiscoverRecipes() {
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const latestRequest = useRef(0);

  // Only the newest request updates the screen, so a slow older response can't replace it.
  const run = async (request: () => Promise<Recipe[]>) => {
    const requestId = ++latestRequest.current;
    setLoading(true);
    setError(null);
    try {
      const recipes = await request();
      if (requestId === latestRequest.current) setResults(recipes);
    } catch (e) {
      if (requestId === latestRequest.current) {
        setResults([]);
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      if (requestId === latestRequest.current) setLoading(false);
    }
  };

  const search = (query: string) => {
    if (query.trim()) run(() => searchRecipes(query.trim()));
  };

  const browseCuisine = (cuisine: string) => {
    run(() => getRecipesByCuisine(cuisine));
  };

  return { results, loading, error, search, browseCuisine };
}
