import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AppText } from '../AppText';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function PrimaryButton({ label, onPress, disabled, style, textStyle }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, style, pressed && styles.pressed, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <AppText variant="button" style={[styles.text, textStyle, disabled && styles.textDisabled]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.volsOrange,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
  disabled: { backgroundColor: '#E5E5EA' },
  text: { color: '#FFF' },
  textDisabled: { color: '#8E8E93' },
});
