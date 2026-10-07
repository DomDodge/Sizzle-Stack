import { ReactNode } from 'react';
import { Keyboard, StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

// Tapping anywhere outside an input closes the keyboard.
export default function DismissKeyboardView({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={style}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
