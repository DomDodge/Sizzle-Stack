import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useColors } from '../../context/recipe_context';

// Pinned to the bottom of the screen, above scrolling content.
export default function BottomBar({ children }: { children: ReactNode }) {
  const c = useColors();
  return <View style={[styles.bar, { backgroundColor: c.surface, borderTopColor: c.border }]}>{children}</View>;
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
    borderTopWidth: 1,
  },
});
