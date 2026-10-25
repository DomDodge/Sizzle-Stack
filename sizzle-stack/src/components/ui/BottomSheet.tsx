import { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useColors } from '../../context/recipe_context';
import HeaderButton from './HeaderButton';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

// Slides up from the bottom with a "Done" button; tapping the backdrop closes it.
export default function BottomSheet({ visible, onClose, children }: BottomSheetProps) {
  const c = useColors();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        {/* Sits behind the sheet so taps inside the sheet don't close it. */}
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} accessibilityLabel="Close" />
        <View style={[styles.content, { backgroundColor: c.surface }]}>
          <View style={[styles.header, { borderBottomColor: c.border }]}>
            <HeaderButton icon="checkmark-circle" label="Done" onPress={onClose} />
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  content: { paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
});
