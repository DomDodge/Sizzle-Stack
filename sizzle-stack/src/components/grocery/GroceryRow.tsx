import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { GroceryItem } from '../../context/recipe_context';
import { formatIngredient } from '../../utils/ingredients';

interface GroceryRowProps {
  item: GroceryItem;
  onToggle: () => void;
  onRemove: () => void;
}

export default function GroceryRow({ item, onToggle, onRemove }: GroceryRowProps) {
  return (
    <View style={styles.row}>
      <Pressable style={styles.main} onPress={onToggle}>
        <Ionicons
          name={item.checked ? 'checkbox' : 'square-outline'}
          size={24}
          color={item.checked ? Colors.freshGreen : Colors.textMuted}
        />
        <Text style={[styles.text, item.checked && styles.checked]}>{formatIngredient(item)}</Text>
      </Pressable>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Ionicons name="trash-outline" size={20} color={Colors.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  main: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  text: { flex: 1, fontSize: 16, color: Colors.text },
  checked: { color: Colors.textMuted, textDecorationLine: 'line-through' },
});
