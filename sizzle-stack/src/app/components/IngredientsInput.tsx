import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export interface IngredientItem {
  amount: string;
  unit: string;
  name: string;
}

interface IngredientsInputProps {
  ingredients: IngredientItem[];
  onChangeIngredients: (ingredients: IngredientItem[]) => void;
}

const UNITS = [
  'tsp',
  'tbsp',
  'cup',
  'oz',
  'lb',
  'g',
  'ml',
  'clove',
  'pinch',
  'piece',
];

export default function IngredientsInput({
  ingredients,
  onChangeIngredients,
}: IngredientsInputProps) {
  const handleUpdate = (field: keyof IngredientItem, value: string, index: number) => {
    const updated = [...ingredients];
    updated[index] = { ...updated[index], [field]: value };
    onChangeIngredients(updated);
  };

  const handleAdd = () => {
    onChangeIngredients([...ingredients, { amount: '', unit: 'tsp', name: '' }]);
  };

  const handleRemove = (index: number) => {
    if (ingredients.length === 1) return;
    const updated = ingredients.filter((_, i) => i !== index);
    onChangeIngredients(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingredients</Text>

      {ingredients.map((item, index) => (
        <View key={index} style={styles.row}>
          {/* 1. Amount Input */}
          <TextInput
            style={styles.amountInput}
            placeholder="Qty"
            keyboardType="decimal-pad"
            value={item.amount}
            onChangeText={(text) => handleUpdate('amount', text, index)}
            returnKeyType="done"
          />

          {/* 2. Unit Picker */}
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={item.unit}
              onValueChange={(value) => handleUpdate('unit', value, index)}
              style={styles.picker}
            >
              {UNITS.map((unit) => (
                <Picker.Item key={unit} label={unit} value={unit} />
              ))}
            </Picker>
          </View>

          {/* 3. Name Input */}
          <TextInput
            style={styles.nameInput}
            placeholder="Ingredient name"
            value={item.name}
            onChangeText={(text) => handleUpdate('name', text, index)}
            returnKeyType="done"
          />

          {/* Remove Button */}
          {ingredients.length > 1 && (
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemove(index)}
            >
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addText}>+ Add Ingredient</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  amountInput: {
    width: 60,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  pickerWrapper: {
    width: 105,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 44,
  },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  removeButton: {
    paddingHorizontal: 6,
  },
  removeText: { color: '#FF3B30', fontSize: 18, fontWeight: 'bold' },
  addButton: { marginTop: 4, alignSelf: 'flex-start' },
  addText: { color: '#007AFF', fontSize: 16, fontWeight: '500' },
});