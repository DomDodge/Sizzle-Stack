import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// A labelled section of a form.
export default function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
});
