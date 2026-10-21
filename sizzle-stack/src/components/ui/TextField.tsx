import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { fieldBorder } from '../../constants/Styles';
import { useColors } from '../../context/recipe_context';
import FormField from './FormField';

interface TextFieldProps extends TextInputProps {
  label: string;
}

export default function TextField({ label, style, ...inputProps }: TextFieldProps) {
  const c = useColors();
  return (
    <FormField label={label}>
      <TextInput style={[styles.input, { color: c.text }, style]} placeholderTextColor={c.textMuted} {...inputProps} />
    </FormField>
  );
}

const styles = StyleSheet.create({
  input: { ...fieldBorder, padding: 12, fontSize: 16 },
});
