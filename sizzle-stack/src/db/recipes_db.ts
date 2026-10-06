import { Directory, File, Paths } from 'expo-file-system';
import { Platform } from 'react-native';
import type { SQLiteDatabase } from 'expo-sqlite';
import type { Ingredient, NewRecipe, Recipe } from '../context/recipe_context';

export const DATABASE_NAME = 'sizzle-stack.db';

const DATABASE_VERSION = 1;

// Picked photos live in the image picker's cache, which the OS can clear,
// so they are copied into the app's document directory before being saved.
const imagesDir = new Directory(Paths.document, 'recipe-images');

interface RecipeRow {
  id: number;
  title: string;
  instructions: string;
  image: string;
  ingredients: string;
}

// Runs once when the database opens. Bump DATABASE_VERSION and add a step
// below whenever the schema changes.
export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const result = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  let currentVersion = result?.user_version ?? 0;

  if (currentVersion >= DATABASE_VERSION) return;

  if (currentVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS recipes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        instructions TEXT NOT NULL,
        image TEXT NOT NULL DEFAULT '',
        ingredients TEXT NOT NULL DEFAULT '[]',
        created_at INTEGER NOT NULL
      );
    `);
    currentVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

export async function getAllRecipes(db: SQLiteDatabase): Promise<Recipe[]> {
  const rows = await db.getAllAsync<RecipeRow>(
    'SELECT id, title, instructions, image, ingredients FROM recipes ORDER BY created_at ASC'
  );
  return rows.map(rowToRecipe);
}

export async function insertRecipe(db: SQLiteDatabase, recipe: NewRecipe): Promise<Recipe> {
  const image = await persistImage(recipe.image);
  const result = await db.runAsync(
    'INSERT INTO recipes (title, instructions, image, ingredients, created_at) VALUES (?, ?, ?, ?, ?)',
    recipe.title,
    recipe.instructions,
    image,
    JSON.stringify(recipe.ingredients),
    Date.now()
  );
  return { ...recipe, id: result.lastInsertRowId, image: resolveImageUri(image) };
}

// Saves a new photo for a recipe and removes the one it replaces.
// Returns the uri to display.
export async function updateRecipeImage(db: SQLiteDatabase, id: number, imageUri: string): Promise<string> {
  const existing = await db.getFirstAsync<{ image: string }>('SELECT image FROM recipes WHERE id = ?', id);
  const image = await persistImage(imageUri);
  await db.runAsync('UPDATE recipes SET image = ? WHERE id = ?', image, id);
  if (existing?.image) deleteImage(existing.image);
  return resolveImageUri(image);
}

export async function deleteRecipe(db: SQLiteDatabase, id: number) {
  const existing = await db.getFirstAsync<{ image: string }>('SELECT image FROM recipes WHERE id = ?', id);
  await db.runAsync('DELETE FROM recipes WHERE id = ?', id);
  if (existing?.image) deleteImage(existing.image);
}

function rowToRecipe(row: RecipeRow): Recipe {
  let ingredients: Ingredient[] = [];
  try {
    ingredients = JSON.parse(row.ingredients);
  } catch (e) {
    console.warn(`Failed to parse ingredients for recipe ${row.id}`, e);
  }
  return {
    id: row.id,
    title: row.title,
    instructions: row.instructions,
    image: resolveImageUri(row.image),
    ingredients,
  };
}

// Copies a picked image into app storage and returns the stored file name.
// Only the name is stored because the documents path can change between
// app updates on iOS.
async function persistImage(uri: string): Promise<string> {
  if (!uri || Platform.OS === 'web') return uri;

  imagesDir.create({ idempotent: true, intermediates: true });
  const source = new File(uri);
  const extension = source.extension || '.jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;
  await source.copy(new File(imagesDir, fileName));
  return fileName;
}

function resolveImageUri(image: string): string {
  if (!image || image.includes(':')) return image;
  return new File(imagesDir, image).uri;
}

function deleteImage(image: string) {
  if (image.includes(':')) return;
  try {
    const file = new File(imagesDir, image);
    if (file.exists) file.delete();
  } catch (e) {
    console.warn('Failed to delete recipe image', e);
  }
}
