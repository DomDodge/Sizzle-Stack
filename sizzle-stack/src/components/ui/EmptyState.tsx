import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useColors } from '../../context/recipe_context';
import { AppText } from '../AppText';

interface EmptyStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  message: string;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
}

export default function EmptyState({ icon, message, iconSize = 40, style }: EmptyStateProps) {
  const { textMuted } = useColors();
  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={iconSize} color={textMuted} />
      <AppText style={{ color: textMuted }}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: 10 },
});
