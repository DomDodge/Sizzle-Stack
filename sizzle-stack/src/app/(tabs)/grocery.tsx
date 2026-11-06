import { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, View } from "react-native";
import GroceryRow from '../../components/grocery/GroceryRow';
import EmptyState from '../../components/ui/EmptyState';
import PrimaryButton from '../../components/ui/PrimaryButton';
import Snackbar from '../../components/ui/Snackbar';
import { GroceryItem, useGrocery } from '../../context/recipe_context';
import { formatIngredient } from '../../utils/ingredients';

export default function Grocery() {
  const { items, toggleItem, removeItem, restoreItem, clearList } = useGrocery();
  // The most recently removed item, kept while its Undo snackbar is showing.
  const [removed, setRemoved] = useState<{ item: GroceryItem; index: number } | null>(null);
  const dismissSnackbar = useCallback(() => setRemoved(null), []);

  const handleRemove = (item: GroceryItem, index: number) => {
    removeItem(item.id);
    setRemoved({ item, index });
  };

  const handleUndo = () => {
    if (removed) restoreItem(removed.item, removed.index);
    setRemoved(null);
  };

  const clearAll = () => {
    setRemoved(null);
    clearList();
  };

  const confirmClear = () => {
    // Alert.alert does nothing on web.
    if (Platform.OS === 'web') return clearAll();
    Alert.alert('Clear grocery list?', 'This removes every item from your list.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearAll },
    ]);
  };

  return (
    <View style={styles.screen}>
      {items.length === 0 ? (
        <EmptyState icon="cart-outline" message="Your grocery list is empty." style={styles.empty} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.container}
          renderItem={({ item, index }) => (
            <GroceryRow item={item} onToggle={() => toggleItem(item.id)} onRemove={() => handleRemove(item, index)} />
          )}
          ListFooterComponent={<PrimaryButton label="Clear List" onPress={confirmClear} style={styles.clearButton} />}
        />
      )}
      {removed && (
        <Snackbar
          key={removed.item.id}
          message={`Removed ${formatIngredient(removed.item)}`}
          actionLabel="UNDO"
          onAction={handleUndo}
          onDismiss={dismissSnackbar}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  // Extra bottom padding so the snackbar can't cover the Clear List button.
  container: { padding: 20, paddingBottom: 80, gap: 10 },
  empty: { flex: 1 },
  clearButton: { marginTop: 10 },
});
