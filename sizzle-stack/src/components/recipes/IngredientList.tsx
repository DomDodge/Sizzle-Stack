import { StyleSheet, View } from 'react-native';
import { Ingredient, useColors } from '../../context/recipe_context';
import { formatIngredient } from '../../utils/ingredients';
import { AppText } from '../AppText';

export default function IngredientList({ ingredients }: { ingredients: Ingredient[] }) {
  const borderColor = useColors().text;
  return (
    <View style={[styles.list, { borderColor }]}>
      {ingredients.map((ing, idx) => (
        <View style={[styles.row, { borderColor }]} key={idx}>
          <AppText>{formatIngredient(ing)}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    borderTopWidth: 2,
  },
  row: {
    height: 30,
    width: '100%',
    borderBottomWidth: 2,
    justifyContent: 'center',
  },
});
