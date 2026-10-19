import { StyleSheet, View } from 'react-native';
import { Ingredient } from '../../context/recipe_context';
import { formatIngredient } from '../../utils/ingredients';
import { AppText } from '../AppText';

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  return (
    <View style={styles.list}>
      {ingredients.map((ing, idx) => (
        <View style={styles.row} key={idx}>
          <AppText>{formatIngredient(ing)}</AppText>
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
