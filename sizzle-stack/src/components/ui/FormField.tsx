import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../AppText';

// A labelled section of a form.
export default function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.container}>
      <AppText variant="itemTitle" style={styles.label}>{label}</AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { marginBottom: 8 },
});
