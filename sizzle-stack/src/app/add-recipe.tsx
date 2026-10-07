import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from 'react-native';
import RecipeForm from '../components/recipe-form/RecipeForm';
import BottomBar from '../components/ui/BottomBar';
import DismissKeyboardView from '../components/ui/DismissKeyboardView';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useRecipeForm } from '../hooks/useRecipeForm';

export default function AddRecipeScreen() {
  const router = useRouter();
  const form = useRecipeForm(() => router.back());

  return (
    <DismissKeyboardView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <RecipeForm form={form} />
      </ScrollView>

      <BottomBar>
        <PrimaryButton
          label={form.saving ? 'Saving...' : 'Submit Recipe'}
          onPress={form.submit}
          disabled={!form.isFormValid}
          style={styles.submitButton}
        />
      </BottomBar>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 16, paddingBottom: 100 },
  submitButton: { backgroundColor: '#007AFF' },
});
