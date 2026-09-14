import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface IngredientItem {
  measurement: number;
  unit: string;
  ingredient: string;
}

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);

  const handleAddIngredient = (newItem: IngredientItem) => {
    setIngredients((prev: IngredientItem[]) => [...prev, newItem]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Name:</Text>
      <TextInput 
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="New Recipe..."
        autoCapitalize="none"
      />

      <Text style={styles.label}>Instructions:</Text>
      <TextInput 
        style={styles.input}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Gently bake and yada yada yada etc. You got some nice... [your food]"
        autoCapitalize="none"
        multiline
      />

      <Text style={styles.label}>Ingredients:</Text>
      
      {/* Ingredient Form Input Row */}
      <IngredientInputForm onAdd={handleAddIngredient} />

      {/* Render Current List of Added Ingredients */}
      <FlatList
        data={ingredients}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.addedItemRow}>
            <Text style={styles.addedItemText}>
              • {item.measurement} {item.unit} {item.ingredient}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

// Sub-Component: Ingredient Input Form
function IngredientInputForm({ onAdd }: { onAdd: (item: IngredientItem) => void }) {
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [ingred, setIngred] = useState("");

  const handleAmountChange = (text: string) => {
    // Allows positive integers or float numbers (e.g. 1.5)
    const sanitized = text.replace(/[^0-9.]/g, '');
    if ((sanitized.match(/\./g) || []).length <= 1) {
      setAmount(sanitized);
    }
  };

  const handleAdd = () => {
    if (!amount || !ingred) return;

    onAdd({
      measurement: parseFloat(amount) || 0,
      unit: unit,
      ingredient: ingred,
    });

    // Reset inputs
    setAmount("");
    setUnit("");
    setIngred("");
  };

  return (
    <View style={styles.ingredientList}>
      <View style={styles.ingredient}>
        
        {/* Measurement Input */}
        <View style={styles.column}>
          <Text style={styles.smallLabel}>Measurement:</Text>
          <TextInput
            style={styles.smallInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0"
          />
        </View>

        {/* Unit Selector */}
        <View style={styles.column}>
          <Text style={styles.smallLabel}>Unit:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={unit}
              onValueChange={(itemValue) => setUnit(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="None" value="" />
              <Picker.Item label="tsp" value="tsp" />
              <Picker.Item label="tbsp" value="tbsp" />
              <Picker.Item label="cup" value="cup" />
              <Picker.Item label="fl oz" value="fl oz" />
              <Picker.Item label="pt" value="pt" />
              <Picker.Item label="qt" value="qt" />
              <Picker.Item label="gal" value="gal" />
              <Picker.Item label="oz" value="oz" />
              <Picker.Item label="lb" value="lb" />
              <Picker.Item label="g" value="g" />
              <Picker.Item label="kg" value="kg" />
              <Picker.Item label="pinch" value="pinch" />
              <Picker.Item label="dash" value="dash" />
            </Picker>
          </View>
        </View>

        {/* Ingredient Text Input */}
        <View style={styles.columnFlex}>
          <Text style={styles.smallLabel}>Ingredient:</Text>
          <TextInput
            style={styles.ingredientNameInput}
            value={ingred}
            onChangeText={setIngred}
            placeholder="watermelon"
            autoCapitalize="none"
          />
        </View>

        {/* Add Button */}
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Add +</Text>
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
    flex: 1,
  },
  input: {
    padding: 8,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
  },
  smallInput: {
    padding: 4,
    width: 60,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    textAlign: 'center',
  },
  ingredientNameInput: {
    padding: 8,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    width: '100%',
  },
  pickerWrapper: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    backgroundColor: 'white',
    width: 100,
    height: 40,
    justifyContent: 'center',
  },
  picker: {
    width: 100,
    height: 40,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  ingredientList: {
    flexDirection: 'column',
    gap: 5,
  },
  ingredient: {
    backgroundColor: "white",
    width: '100%',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  smallLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  columnFlex: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  addButton: {
    backgroundColor: 'black',
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addedItemRow: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  addedItemText: {
    fontSize: 14,
  },
});