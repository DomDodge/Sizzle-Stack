import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export interface IngredientItem {
  amount: string;
  unit: string;
  name: string;
}

interface IngredientsInputProps {
  ingredients: IngredientItem[];
  onChangeIngredients: (ingredients: IngredientItem[]) => void;
}

const UNITS = ['tsp', 'tbsp', 'cup', 'oz', 'lb', 'g', 'ml', 'clove', 'pinch', 'piece'];

export default function IngredientsInput({
  ingredients,
  onChangeIngredients,
}: IngredientsInputProps) {
  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);

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
    onChangeIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ingredients</Text>

      {ingredients.map((item, index) => (
        <View key={index} style={styles.row}>
          <TextInput
            style={styles.amountInput}
            placeholder="Qty"
            keyboardType="decimal-pad"
            value={item.amount}
            onChangeText={(text) => handleUpdate('amount', text, index)}
            returnKeyType="done"
          />

          {Platform.OS === 'ios' ? (
            <>
              <TouchableOpacity
                style={styles.pickerWrapper}
                onPress={() => setActivePickerIndex(index)}
              >
                <Text style={styles.pickerButtonText}>{item.unit}</Text>
              </TouchableOpacity>

              <Modal
                visible={activePickerIndex === index}
                transparent
                animationType="slide"
                onRequestClose={() => setActivePickerIndex(null)}
              >
                <TouchableOpacity
                  style={styles.modalOverlay}
                  activeOpacity={1}
                  onPress={() => setActivePickerIndex(null)}
                >
                  <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                      <TouchableOpacity onPress={() => setActivePickerIndex(null)}>
                        <Text style={styles.doneText}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <Picker
                      selectedValue={item.unit}
                      onValueChange={(value) => handleUpdate('unit', value, index)}
                    >
                      {UNITS.map((unit) => (
                        <Picker.Item key={unit} label={unit} value={unit} />
                      ))}
                    </Picker>
                  </View>
                </TouchableOpacity>
              </Modal>
            </>
          ) : (
            <View style={styles.pickerWrapperAndroid}>
              <Picker
                selectedValue={item.unit}
                onValueChange={(value) => handleUpdate('unit', value, index)}
                style={styles.picker}
                mode="dropdown"
              >
                {UNITS.map((unit) => (
                  <Picker.Item key={unit} label={unit} value={unit} />
                ))}
              </Picker>
            </View>
          )}

          <TextInput
            style={styles.nameInput}
            placeholder="Ingredient name"
            value={item.name}
            onChangeText={(text) => handleUpdate('name', text, index)}
            returnKeyType="done"
          />

          {ingredients.length > 1 && (
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemove(index)}>
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
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 6 },
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
    height: 44,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  pickerWrapperAndroid: {
    width: 105,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: { height: 44 },
  pickerButtonText: { fontSize: 15 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: { backgroundColor: '#fff' },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  doneText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  nameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
  },
  removeButton: { paddingHorizontal: 6 },
  removeText: { color: '#FF3B30', fontSize: 18, fontWeight: 'bold' },
  addButton: { marginTop: 4, alignSelf: 'flex-start' },
  addText: { color: '#007AFF', fontSize: 16, fontWeight: '500' },
});