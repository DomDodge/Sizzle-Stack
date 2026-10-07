import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { fieldBorder } from '../../constants/Styles';
import FormField from './FormField';

interface TextFieldProps extends TextInputProps {
  label: string;
}

export default function TextField({ label, style, ...inputProps }: TextFieldProps) {
  return (
    <FormField label={label}>
      <TextInput style={[styles.input, style]} {...inputProps} />
    </FormField>
  );
}

const styles = StyleSheet.create({
  input: { ...fieldBorder, padding: 12, fontSize: 16 },
});
