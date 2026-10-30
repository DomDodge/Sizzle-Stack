import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { AppText } from '../../components/AppText';
import RecipeGrid from '../../components/recipes/RecipeGrid';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { Colors } from '../../constants/Colors';
import { fieldBorder } from '../../constants/Styles';
import { Recipe, useColors } from '../../context/recipe_context';
import { useDiscoverRecipes } from '../../hooks/useDiscoverRecipes';

export default function Discover() {
  const c = useColors();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { results, loading, error, search } = useDiscoverRecipes();

  const openRecipe = (recipe: Recipe) =>
    router.push({ pathname: '/recipe-detail', params: { id: String(recipe.id), source: 'discover' } });

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardDismissMode="on-drag" keyboardShouldPersistTaps="handled">
      <AppText variant="sectionTitle">Discover New Recipes:</AppText>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, { color: c.text }]}
          placeholder="Search recipes..."
          placeholderTextColor={c.textMuted}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => search(query)}
          returnKeyType="search"
          autoCapitalize="none"
        />
        <PrimaryButton label="Search" onPress={() => search(query)} disabled={loading} style={styles.button} />
      </View>

      {loading && <ActivityIndicator color={Colors.volsOrange} />}
      {error && <AppText style={{ color: 'red' }}>{error}</AppText>}
      <RecipeGrid recipes={results} onPressRecipe={openRecipe} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 20 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  input: { ...fieldBorder, flex: 1, padding: 12, fontSize: 16 },
  button: { paddingHorizontal: 16 },
});
