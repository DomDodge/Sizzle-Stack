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

export interface GroceryItem extends Ingredient {
  id: string;
  checked: boolean;
}

interface GroceryContextType {
  items: GroceryItem[];
  addItems: (ingredients: Ingredient[]) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clearList: () => void;
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
const GroceryContext = createContext<GroceryContextType | undefined>(undefined);

export function RecipesProvider({ children }: { children: ReactNode }) {
  return (
    <SQLiteProvider databaseName={RecipesDb.DATABASE_NAME} onInit={RecipesDb.migrateDbIfNeeded}>
      <RecipesStore>{children}</RecipesStore>
    </SQLiteProvider>
  );
}

export function GroceryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GroceryItem[]>([]);

  const addItems = (ingredients: Ingredient[]) => {
    setItems((prev) => [
      ...prev,
      ...ingredients.map((ing) => ({
        ...ing,
        id: `${Date.now()}-${Math.random()}`,
        checked: false,
      })),
    ]);
  };

  const toggleItem = (id: string) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));

  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const clearList = () => setItems([]);

  return (
    <GroceryContext.Provider value={{ items, addItems, toggleItem, removeItem, clearList }}>
      {children}
    </GroceryContext.Provider>
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

export function useGrocery() {
  const ctx = useContext(GroceryContext);
  if (!ctx) throw new Error('useGrocery must be used within a GroceryProvider');
  return ctx;
}
