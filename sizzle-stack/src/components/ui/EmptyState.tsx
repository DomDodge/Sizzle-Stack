import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../constants/Colors';

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
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: 10 },
  text: { fontSize: 16, color: Colors.textMuted },
});
