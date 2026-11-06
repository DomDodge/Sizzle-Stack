import { useEffect } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AppText } from '../AppText';

const DURATION_MS = 5000;

interface SnackbarProps {
  message: string;
  actionLabel: string;
  onAction: () => void;
  onDismiss: () => void; // Must be stable, or re-renders restart the timer.
}

// Brief message pinned to the bottom of its screen. The parent must have flex: 1.
// Give it a key per message so a new one restarts the timer.
export default function Snackbar({ message, actionLabel, onAction, onDismiss }: SnackbarProps) {
  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(message);
    const timer = setTimeout(onDismiss, DURATION_MS);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <View style={styles.bar}>
      <AppText style={styles.message} numberOfLines={2}>{message}</AppText>
      <Pressable
        style={styles.action}
        onPress={onAction}
        android_ripple={{ color: Colors.rippleOnBrand }}
        accessibilityRole="button"
        accessibilityLabel={actionLabel}
      >
        <AppText variant="button" style={styles.actionText}>{actionLabel}</AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Same dark bar in both themes, so the text and action colors always contrast with it.
  bar: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#323232',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 4,
    gap: 8,
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.3)',
  },
  message: { flex: 1, color: '#FFFFFF', paddingVertical: 12 },
  action: { minWidth: 48, minHeight: 48, paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center' },
  actionText: { color: Colors.volsOrange },
});
