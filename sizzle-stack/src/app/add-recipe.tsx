import { useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import IngredientsInput, { IngredientItem } from './components/IngredientsInput';
import InstructionsInput from './components/InstructionsInput';
import TitleInput from './components/TitleInput';

export default function AddRecipeScreen() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    { amount: '', unit: 'tsp', name: '' },
  ]);
  const [instructions, setInstructions] = useState('');

  // Validation: Title present, at least one ingredient with a non-empty name, and instructions present
  const isFormValid =
    title.trim().length > 0 &&
    ingredients.some((item) => item.name.trim().length > 0) &&
    instructions.trim().length > 0;

  const handleSubmit = () => {
    if (!isFormValid) return;

    const recipeData = {
      title: title.trim(),
      // Filter out any ingredient rows where the name is completely empty
      ingredients: ingredients.filter((item) => item.name.trim() !== ''),
      instructions: instructions.trim(),
    };

    console.log('Recipe Submitted:', recipeData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <TitleInput title={title} onChangeTitle={setTitle} />
          <IngredientsInput ingredients={ingredients} onChangeIngredients={setIngredients} />
          <InstructionsInput instructions={instructions} onChangeInstructions={setInstructions} />
        </ScrollView>

        {/* Submit Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.submitButton, isFormValid ? styles.submitActive : styles.submitDisabled]}
            disabled={!isFormValid}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitText, isFormValid ? styles.submitTextActive : styles.submitTextDisabled]}>
              Submit Recipe
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  submitButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitActive: { backgroundColor: '#007AFF' },
  submitDisabled: { backgroundColor: '#E5E5EA' },
  submitText: { fontSize: 16, fontWeight: '600' },
  submitTextActive: { color: '#FFF' },
  submitTextDisabled: { color: '#8E8E93' },
});