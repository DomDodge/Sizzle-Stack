import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ingredient } from '../../context/recipe_context';
import { emptyIngredient } from '../../utils/ingredients';
import FormField from '../ui/FormField';
import IngredientRow from './IngredientRow';
import { AppText } from '../AppText';

interface IngredientsInputProps {
  ingredients: Ingredient[];
  onChangeIngredients: (ingredients: Ingredient[]) => void;
}

export default function IngredientsInput({ ingredients, onChangeIngredients }: IngredientsInputProps) {
  const handleUpdate = (index: number, updated: Ingredient) =>
    onChangeIngredients(ingredients.map((item, i) => (i === index ? updated : item)));

  const handleAdd = () => onChangeIngredients([...ingredients, emptyIngredient()]);

  const handleRemove = (index: number) => onChangeIngredients(ingredients.filter((_, i) => i !== index));

  return (
    <FormField label="Ingredients">
      {ingredients.map((item, index) => (
        <IngredientRow
          key={index}
          ingredient={item}
          onChange={(updated) => handleUpdate(index, updated)}
          // Always keep at least one row.
          onRemove={ingredients.length > 1 ? () => handleRemove(index) : undefined}
        />
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <AppText variant="button" style={styles.addText}>+ Add Ingredient</AppText>
      </TouchableOpacity>
    </FormField>
  );
}

const styles = StyleSheet.create({
  addButton: { marginTop: 4, alignSelf: 'flex-start' },
  addText: { color: '#007AFF' },
});
