import { useState } from 'react';
import { searchRecipes } from '../api/recipes_api';
import { Recipe } from '../context/recipe_context';

// Runs a recipe search on demand and tracks its result, loading and error state.
export function useDiscoverRecipes() {
  const [results, setResults] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setResults(await searchRecipes(query.trim()));
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, search };
}
