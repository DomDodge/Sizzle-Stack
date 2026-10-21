import { Ionicons } from '@expo/vector-icons';
import { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColors } from '../../context/recipe_context';
import { AppText } from '../AppText';

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
            <Pressable style={styles.doneButton} onPress={onClose} hitSlop={8}>
              <Ionicons name="checkmark-circle" size={22} color={Colors.link} />
              <AppText variant="button" style={styles.doneText}>Done</AppText>
            </Pressable>
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
    padding: 10,
    borderBottomWidth: 1,
  },
  doneButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  doneText: { color: Colors.link },
});
