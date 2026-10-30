import { Ingredient } from '../context/recipe_context';

export const UNITS = ['tsp', 'tbsp', 'cup', 'oz', 'lb', 'g', 'ml', 'clove', 'pinch', 'piece'];

// Matches outside spellings like "Tbsps" or "cups" to a unit above. Unknown units are kept as-is.
export const normalizeUnit = (unit: string) => {
  const lower = unit.trim().toLowerCase();
  const singular = lower.replace(/s$/, '');
  return UNITS.find((u) => u === lower || u === singular) ?? lower;
};

export const emptyIngredient =(): Ingredient => ({ amount: '', unit: 'tsp', name: '' });

// "2 cup flour" — skips any blank parts.
export const formatIngredient = ({ amount, unit, name }: Ingredient) =>
  [amount, unit, name].filter(Boolean).join(' ');

// Two ingredients are the same grocery item when name and unit match, ignoring case and spacing.
export const isSameIngredient = (a: Ingredient, b: Ingredient) =>
  a.name.trim().toLowerCase() === b.name.trim().toLowerCase() &&
  a.unit.trim().toLowerCase() === b.unit.trim().toLowerCase();

// Parses "2", "1.5", "1/2" or "1 1/2". Returns null for anything else.
const parseAmount = (amount: string): number | null => {
  const text = amount.trim();
  const mixed = text.match(/^(?:(\d+(?:\.\d+)?)\s+)?(\d+)\/(\d+)$/);
  if (mixed) {
    const denominator = Number(mixed[3]);
    if (denominator === 0) return null;
    return Number(mixed[1] ?? 0) + Number(mixed[2]) / denominator;
  }
  return /^\d*\.?\d+$/.test(text) ? Number(text) : null;
};

// Adds two amounts together, e.g. "1/2" + "1" = "1.5".
// Blank amounts count as nothing; amounts that aren't numbers are joined with "+".
export const addAmounts = (a: string, b: string) => {
  if (!a.trim()) return b;
  if (!b.trim()) return a;
  const x = parseAmount(a);
  const y = parseAmount(b);
  if (x === null || y === null) return `${a.trim()} + ${b.trim()}`;
  return String(Math.round((x + y) * 100) / 100);
};
