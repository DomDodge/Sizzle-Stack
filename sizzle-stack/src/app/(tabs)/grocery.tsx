import { FlatList, StyleSheet } from "react-native";
import GroceryRow from '../../components/grocery/GroceryRow';
import EmptyState from '../../components/ui/EmptyState';
import PrimaryButton from '../../components/ui/PrimaryButton';
import { useGrocery } from '../../context/recipe_context';

export default function Grocery() {
  const { items, toggleItem, removeItem, clearList } = useGrocery();

  if (items.length === 0) {
    return <EmptyState icon="cart-outline" message="Your grocery list is empty." style={styles.empty} />;
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <GroceryRow item={item} onToggle={() => toggleItem(item.id)} onRemove={() => removeItem(item.id)} />
      )}
      ListFooterComponent={<PrimaryButton label="Clear List" onPress={clearList} style={styles.clearButton} />}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  empty: { flex: 1 },
  clearButton: { marginTop: 10 },
});
