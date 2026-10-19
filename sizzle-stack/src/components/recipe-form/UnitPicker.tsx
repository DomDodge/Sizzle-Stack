import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { fieldBorder } from '../../constants/Styles';
import BottomSheet from '../ui/BottomSheet';
import { AppText } from '../AppText';

const UNITS = ['tsp', 'tbsp', 'cup', 'oz', 'lb', 'g', 'ml', 'clove', 'pinch', 'piece'];

interface UnitPickerProps {
  value: string;
  onChange: (unit: string) => void;
}

export default function UnitPicker({ value, onChange }: UnitPickerProps) {
  const [open, setOpen] = useState(false);

  const openSheet = () => {
    Keyboard.dismiss();
    setOpen(true);
  };

  const picker = (
    <Picker selectedValue={value} onValueChange={onChange} style={Platform.OS === 'ios' ? undefined : styles.picker} mode="dropdown" onFocus={Keyboard.dismiss}>
      {UNITS.map((unit) => (
        <Picker.Item key={unit} label={unit} value={unit} />
      ))}
    </Picker>
  );

  // Android shows a native dropdown inline.
  if (Platform.OS !== 'ios') {
    return <View style={[styles.box, styles.androidBox]}>{picker}</View>;
  }

  // iOS's wheel picker is too tall to sit inline, so it opens in a bottom sheet.
  return (
    <>
      <TouchableOpacity style={[styles.box, styles.iosBox]} onPress={openSheet}>
        <AppText variant="secondary">{value}</AppText>
      </TouchableOpacity>
      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        {picker}
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  box: { ...fieldBorder, width: 105, justifyContent: 'center' },
  iosBox: { height: 44, paddingHorizontal: 10 },
  androidBox: { overflow: 'hidden' },
  picker: { height: 44 },
});
