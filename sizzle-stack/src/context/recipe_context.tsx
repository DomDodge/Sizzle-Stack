import { createContext, ReactNode, useContext, useState } from 'react';

export interface Ingredient {
  amount: string;
  unit: string;
  name: string;
}

export interface Recipe {
  title: string;
  instructions: string;
  ingredients: Ingredient[];
}

interface RecipesContextType {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

const initialData: Recipe[] = [
  {
    title: "Lime Rice",
    instructions: "Cook for 1000 seconds on high",
    ingredients: [{ amount: "1", unit: "tablespoon", name: "borax" }],
  },
  {
    title: "Tacos",
    instructions: "Cook for 10000 seconds on high",
    ingredients: [{ amount: "2", unit: "teaspoons", name: "borax" }],
  },
];

export function RecipesProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialData);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  return (
    <RecipesContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error('useRecipes must be used within a RecipesProvider');
  return ctx;
}