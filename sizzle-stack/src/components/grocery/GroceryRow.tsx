import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { GroceryItem, useColors } from '../../context/recipe_context';
import { formatIngredient } from '../../utils/ingredients';
import { AppText } from '../AppText';

interface GroceryRowProps {
  item: GroceryItem;
  onToggle: () => void;
  onRemove: () => void;
}

export default function GroceryRow({ item, onToggle, onRemove }: GroceryRowProps) {
  const c = useColors();
  return (
    <View style={[styles.row, { backgroundColor: c.surface, borderColor: c.border }]}>
      <Pressable style={styles.main} onPress={onToggle}>
        <Ionicons
          name={item.checked ? 'checkbox' : 'square-outline'}
          size={24}
          color={item.checked ? Colors.freshGreen : c.textMuted}
        />
        <AppText style={[styles.text, item.checked && [styles.checked, { color: c.textMuted }]]}>{formatIngredient(item)}</AppText>
      </Pressable>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Ionicons name="trash-outline" size={20} color={c.textMuted} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  main: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 },
  text: { flex: 1 },
  checked: { textDecorationLine: 'line-through' },
});
