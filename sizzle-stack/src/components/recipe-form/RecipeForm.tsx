import { StyleSheet } from 'react-native';
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
});
