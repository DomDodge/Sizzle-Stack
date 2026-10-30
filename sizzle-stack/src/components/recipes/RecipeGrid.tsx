import { StyleSheet, View } from 'react-native';
import { Recipe } from '../../context/recipe_context';
import RecipeCard from './RecipeCard';

interface RecipeGridProps {
  recipes: Recipe[];
  onPressRecipe?: (recipe: Recipe) => void;
}

export default function RecipeGrid({ recipes, onPressRecipe }: RecipeGridProps) {
  return (
    <View style={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onPress={onPressRecipe && (() => onPressRecipe(recipe))} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
});
