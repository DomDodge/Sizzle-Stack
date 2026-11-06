import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColors } from '../../context/recipe_context';
import { AppText } from '../AppText';

interface CuisineChipsProps {
  cuisines: string[];
  selected: string | null;
  onSelect: (cuisine: string) => void;
}

// Horizontally scrolling row of cuisines. The parent's padding is cancelled so it scrolls edge to edge.
export default function CuisineChips({ cuisines, selected, onSelect }: CuisineChipsProps) {
  const c = useColors();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={styles.scroller}
      contentContainerStyle={styles.row}
    >
      {cuisines.map((cuisine) => {
        const isSelected = cuisine === selected;
        return (
          <Pressable
            key={cuisine}
            style={[
              styles.chip,
              isSelected ? styles.chipSelected : { backgroundColor: c.surface, borderColor: c.border },
            ]}
            onPress={() => onSelect(cuisine)}
            android_ripple={{ color: Colors.rippleNeutral }}
            accessibilityRole="button"
            accessibilityLabel={`${cuisine} recipes`}
            accessibilityState={{ selected: isSelected }}
          >
            {/* Dark text on orange, since white on this orange is too low contrast. */}
            <AppText variant="button" style={isSelected && styles.textSelected}>{cuisine}</AppText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroller: { marginHorizontal: -20 },
  row: { paddingHorizontal: 20, gap: 8 },
  chip: {
    minHeight: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Keeps the Android ripple inside the rounded shape
  },
  chipSelected: { backgroundColor: Colors.volsOrange, borderColor: Colors.volsOrange },
  textSelected: { color: '#1E1E1E' },
});
