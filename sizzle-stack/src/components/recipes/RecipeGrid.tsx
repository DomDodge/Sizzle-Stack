import { StyleSheet, View } from 'react-native';
import { Recipe } from '../../context/recipe_context';
import RecipeCard from './RecipeCard';

// Two-column grid of recipe cards.
export default function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <View style={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
});
