import { StyleSheet, Text, TextInput, View } from 'react-native';

interface TitleInputProps {
  title: string;
  onChangeTitle: (text: string) => void;
}

export default function TitleInput({ title, onChangeTitle }: TitleInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recipe Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Chocolate Chip Cookies"
        value={title}
        onChangeText={onChangeTitle}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});