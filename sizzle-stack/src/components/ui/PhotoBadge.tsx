import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { Fonts } from '../../constants/Typography';
import { AppText } from '../AppText';

interface PhotoBadgeProps {
  label: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
}

// Small dark label pinned to the bottom-right corner of an image.
export default function PhotoBadge({ label, icon }: PhotoBadgeProps) {
  return (
    <View style={styles.badge}>
      {icon && <Ionicons name={icon} size={16} color="#FFF" />}
      <AppText variant="secondary" style={styles.text}>{label}</AppText>
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
  text: { color: '#FFF', fontFamily: Fonts.semibold },
});
