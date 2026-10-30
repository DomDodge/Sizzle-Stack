import { StyleSheet, View } from 'react-native';
import { RecipeFormState } from '../../hooks/useRecipeForm';
import TextField from '../ui/TextField';
import ImageInput from './ImageInput';
import IngredientsInput from './IngredientsInput';

export default function RecipeForm({ form }: { form: RecipeFormState }) {
  return (
    <>
      <TextField
        label="Recipe Title"
        placeholder="e.g., Chocolate Chip Cookies"
        value={form.title}
        onChangeText={form.setTitle}
        returnKeyType="done"
      />
      <ImageInput image={form.image} onChangeImage={form.setImage} />
      <View style={styles.row}>
        <View style={styles.half}>
          <TextField
            label="Time (min)"
            placeholder="e.g., 30"
            value={form.readyInMinutes}
            onChangeText={form.setReadyInMinutes}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.half}>
          <TextField
            label="Serves"
            placeholder="e.g., 4"
            value={form.servings}
            onChangeText={form.setServings}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <IngredientsInput ingredients={form.ingredients} onChangeIngredients={form.setIngredients} />
      <TextField
        label="Instructions"
        placeholder="Describe the steps..."
        value={form.instructions}
        onChangeText={form.setInstructions}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        style={styles.multiline}
      />
    </>
  );
}

const styles = StyleSheet.create({
  multiline: { height: 120 },
  row: { flexDirection: 'row', gap: 12 },
  half: { flex: 1 },
});
