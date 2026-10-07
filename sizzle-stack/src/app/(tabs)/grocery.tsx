import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from '../../constants/Colors';
import { GroceryItem, useGrocery } from '../../context/recipe_context';

export default function Grocery() {
  const { items, toggleItem, removeItem, clearList } = useGrocery();

  if (items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="cart-outline" size={40} color={Colors.textMuted} />
        <Text style={styles.emptyText}>Your grocery list is empty.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
      renderItem={({ item }) => (
        <GroceryRow item={item} onToggle={() => toggleItem(item.id)} onRemove={() => removeItem(item.id)} />
      )}
      ListFooterComponent={
        <Pressable style={styles.clearButton} onPress={clearList}>
          <Text style={styles.clearText}>Clear List</Text>
        </Pressable>
      }
    />
  );
}

function GroceryRow({ item, onToggle, onRemove }: { item: GroceryItem; onToggle: () => void; onRemove: () => void }) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.rowMain} onPress={onToggle}>
        <Ionicons
          name={item.checked ? "checkbox" : "square-outline"}
          size={24}
          color={item.checked ? Colors.freshGreen : Colors.textMuted}
        />
        <Text style={[styles.itemText, item.checked && styles.itemChecked]}>
          {[item.amount, item.unit, item.name].filter(Boolean).join(" ")}
        </Text>
      </Pressable>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Ionicons name="trash-outline" size={20} color={Colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  rowMain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  itemChecked: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  clearButton: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: Colors.volsOrange,
  },
  clearText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
