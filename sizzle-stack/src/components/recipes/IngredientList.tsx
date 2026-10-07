import { StyleSheet, Text, View } from 'react-native';
import { Ingredient } from '../../context/recipe_context';
import { formatIngredient } from '../../utils/ingredients';

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <View style={styles.list}>
      {ingredients.map((ing, idx) => (
        <View style={styles.row} key={idx}>
          <Text>{formatIngredient(ing)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    borderTopColor: 'black',
    borderTopWidth: 2,
  },
  row: {
    height: 30,
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
});
