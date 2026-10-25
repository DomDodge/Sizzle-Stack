import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Keyboard, Platform, ScrollView, StyleSheet } from 'react-native';
import RecipeForm from '../components/recipe-form/RecipeForm';
import BottomBar from '../components/ui/BottomBar';
import DismissKeyboardView from '../components/ui/DismissKeyboardView';
import HeaderButton from '../components/ui/HeaderButton';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Colors } from '../constants/Colors';
import { useRecipes } from '../context/recipe_context';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { useRecipeForm } from '../hooks/useRecipeForm';

// Adds a new recipe, or edits one when opened with an `id` param.
export default function AddRecipeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { recipes } = useRecipes();
  const existing = id ? recipes.find((r) => r.id === Number(id)) : undefined;
  const form = useRecipeForm(() => router.back(), existing);
  const keyboardVisible = useKeyboardVisible();

  return (
    <DismissKeyboardView style={styles.container}>
      {/* A "Done" checkmark in the header closes the keyboard, which matters for
          the number pad and multiline instructions since they have no return key to close it. */}
      <Stack.Screen
        options={{
          title: existing ? 'Edit Recipe' : 'Add New Recipe',
          headerRight: () =>
            keyboardVisible ? <HeaderButton icon="checkmark-circle" label="Done" onPress={Keyboard.dismiss} /> : null,
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        automaticallyAdjustKeyboardInsets
      >
        <RecipeForm form={form} />
      </ScrollView>

      {/* Hidden while typing so it doesn't cover the inputs. */}
      {!keyboardVisible && (
        <BottomBar>
          <PrimaryButton
            label={form.saving ? 'Saving...' : existing ? 'Save Changes' : 'Submit Recipe'}
            onPress={form.submit}
            disabled={!form.isFormValid}
            style={styles.submitButton}
          />
        </BottomBar>
      )}
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  submitButton: { backgroundColor: Colors.link },
});
