import { StyleSheet, Text, TextInput, View } from 'react-native';

interface InstructionsInputProps {
  instructions: string;
  onChangeInstructions: (text: string) => void;
}

export default function InstructionsInput({ instructions, onChangeInstructions }: InstructionsInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Describe the steps..."
        value={instructions}
        onChangeText={onChangeInstructions}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
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
  multiline: { height: 120 },
});