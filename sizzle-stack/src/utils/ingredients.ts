import { Ingredient } from '../context/recipe_context';

export const emptyIngredient = (): Ingredient => ({ amount: '', unit: 'tsp', name: '' });

// "2 cup flour" — skips any blank parts.
export const formatIngredient = ({ amount, unit, name }: Ingredient) =>
  [amount, unit, name].filter(Boolean).join(' ');
