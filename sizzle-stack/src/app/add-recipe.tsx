import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from "expo-router";
import { Keyboard, Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import RecipeForm from '../components/recipe-form/RecipeForm';
import BottomBar from '../components/ui/BottomBar';
import DismissKeyboardView from '../components/ui/DismissKeyboardView';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Colors } from '../constants/Colors';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { useRecipeForm } from '../hooks/useRecipeForm';
import { AppText } from '../components/AppText';

export default function AddRecipeScreen() {
  const router = useRouter();
  const form = useRecipeForm(() => router.back());
  const keyboardVisible = useKeyboardVisible();

  return (
    <DismissKeyboardView style={styles.container}>
      {/* A "Done" checkmark in the header closes the keyboard, which matters for
          the number pad and multiline instructions since they have no return key to close it. */}
      <Stack.Screen
        options={{
          headerRight: () =>
            keyboardVisible ? (
              <Pressable style={styles.doneButton} onPress={Keyboard.dismiss} hitSlop={8}>
                <Ionicons name="checkmark-circle" size={22} color={Colors.link} />
                <AppText variant="button" style={styles.doneText}>Done</AppText>
              </Pressable>
            ) : null,
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
            label={form.saving ? 'Saving...' : 'Submit Recipe'}
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
  doneButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  doneText: { color: Colors.link },
});
