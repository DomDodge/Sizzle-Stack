import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';

// Pinned to the bottom of the screen, above scrolling content.
export default function BottomBar({ children }: { children: ReactNode }) {
  return <View style={styles.bar}>{children}</View>;
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});
