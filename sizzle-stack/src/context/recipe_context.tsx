import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as RecipesDb from '../db/recipes_db';

export interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}

export interface Recipe {
  id: number;
  title: string;
  instructions: string;
  image: string;
  ingredients: Ingredient[];
}

export type NewRecipe = Omit<Recipe, 'id'>;

interface RecipesContextType {
  recipes: Recipe[];
  loading: boolean;
  addRecipe: (recipe: NewRecipe) => Promise<void>;
  updateRecipeImage: (id: number, imageUri: string) => Promise<void>;
  deleteRecipe: (id: number) => Promise<void>;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  return (
    <SQLiteProvider databaseName={RecipesDb.DATABASE_NAME} onInit={RecipesDb.migrateDbIfNeeded}>
      <RecipesStore>{children}</RecipesStore>
    </SQLiteProvider>
  );
}

function RecipesStore({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    RecipesDb.getAllRecipes(db)
      .then(setRecipes)
      .catch((e) => console.warn('Failed to load recipes', e))
      .finally(() => setLoading(false));
  }, [db]);

  const addRecipe = async (recipe: NewRecipe) => {
    const saved = await RecipesDb.insertRecipe(db, recipe);
    setRecipes((prev) => [...prev, saved]);
  };

  const updateRecipeImage = async (id: number, imageUri: string) => {
    const image = await RecipesDb.updateRecipeImage(db, id, imageUri);
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, image } : r)));
  };

  const deleteRecipe = async (id: number) => {
    await RecipesDb.deleteRecipe(db, id);
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipesContext.Provider value={{ recipes, loading, addRecipe, updateRecipeImage, deleteRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes must be used within a RecipesProvider');
  return ctx;
}
