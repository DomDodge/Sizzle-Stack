import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface PhotoBadgeProps {
  label: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
}

// Small dark label pinned to the bottom-right corner of an image.
export default function PhotoBadge({ label, icon }: PhotoBadgeProps) {
  return (
    <View style={styles.badge}>
      {icon && <Ionicons name={icon} size={16} color="#FFF" />}
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: { color: '#FFF', fontWeight: '600' },
});
