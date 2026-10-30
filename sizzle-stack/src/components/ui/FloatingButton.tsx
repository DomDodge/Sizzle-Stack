import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

interface FloatingButtonProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string; // read by screen readers
  onPress: () => void;
}

// Round button pinned to the bottom-right corner of its screen. The parent must have flex: 1.
export default function FloatingButton({ icon, label, onPress }: FloatingButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Ionicons name={icon} size={30} color="#FFFFFF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.volsOrange,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
  },
  pressed: { opacity: 0.8 },
});
