import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { fieldBorder } from '../../constants/Styles';
import { Ingredient } from '../../context/recipe_context';
import UnitPicker from './UnitPicker';
import { AppText } from '../AppText';

interface IngredientRowProps {
  ingredient: Ingredient;
  onChange: (ingredient: Ingredient) => void;
  // Omit to hide the remove button.
  onRemove?: () => void;
}

export default function IngredientRow({ ingredient, onChange, onRemove }: IngredientRowProps) {
  const update = (field: keyof Ingredient) => (value: string) => onChange({ ...ingredient, [field]: value });

  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, styles.amount]}
        placeholder="Qty"
        keyboardType="decimal-pad"
        value={ingredient.amount}
        onChangeText={update('amount')}
        returnKeyType="done"
      />
      <UnitPicker value={ingredient.unit} onChange={update('unit')} />
      <TextInput
        style={[styles.input, styles.name]}
        placeholder="Ingredient name"
        value={ingredient.name}
        onChangeText={update('name')}
        returnKeyType="done"
      />
      {onRemove && (
        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <AppText variant="button" style={styles.removeText}>✕</AppText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 6 },
  input: { ...fieldBorder, padding: 10, fontSize: 15 },
  amount: { width: 60 },
  name: { flex: 1 },
  removeButton: { paddingHorizontal: 6 },
  removeText: { color: '#FF3B30', fontSize: 18, fontWeight: 'bold' },
});
