import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AppText } from '../AppText';

interface HeaderButtonProps {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
}

// Icon + text button for the right side of a header, e.g. "Done" or "Edit".
export default function HeaderButton({ label, icon, onPress }: HeaderButtonProps) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress} hitSlop={8}>
      <Ionicons name={icon} size={22} color={Colors.link} />
      <AppText variant="button" style={styles.text}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { flexDirection: 'row', alignItems: 'center', gap: 4, minHeight: 44, paddingHorizontal: 4 },
  pressed: { opacity: 0.6 },
  text: { color: Colors.link },
});
