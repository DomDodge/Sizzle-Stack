import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

const PICKER_OPTIONS: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images'],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.7,
};

// Lets the user take a photo or choose one from their library.
// Resolves with the picked image's uri, or null if they cancelled.
export function pickRecipeImage(): Promise<string | null> {
  // Alert buttons aren't supported on web, so go straight to the file picker.
  if (Platform.OS === 'web') return launch('library');

  return new Promise((resolve) => {
    Alert.alert('Add a Photo', undefined, [
      { text: 'Take Photo', onPress: () => launch('camera').then(resolve) },
      { text: 'Choose from Library', onPress: () => launch('library').then(resolve) },
      { text: 'Cancel', style: 'cancel', onPress: () => resolve(null) },
    ], { cancelable: true, onDismiss: () => resolve(null) });
  });
}

async function launch(source: 'camera' | 'library'): Promise<string | null> {
  const permission = source === 'camera'
    ? await ImagePicker.requestCameraPermissionsAsync()
    : await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permission needed',
      `Allow access to your ${source === 'camera' ? 'camera' : 'photos'} in Settings to add recipe pictures.`
    );
    return null;
  }

  const result = source === 'camera'
    ? await ImagePicker.launchCameraAsync(PICKER_OPTIONS)
    : await ImagePicker.launchImageLibraryAsync(PICKER_OPTIONS);

  return result.canceled ? null : result.assets[0].uri;
}
