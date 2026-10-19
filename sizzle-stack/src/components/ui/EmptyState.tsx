import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { AppText } from '../AppText';

interface EmptyStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  message: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
}

export default function EmptyState({ icon, message, iconSize = 40, style }: EmptyStateProps) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={iconSize} color={Colors.textMuted} />
      <AppText style={styles.text}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: 10 },
  text: { color: Colors.textMuted },
});
