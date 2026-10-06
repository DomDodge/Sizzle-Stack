import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

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

interface ImageInputProps {
  image: string;
  onChangeImage: (uri: string) => void;
}

export default function ImageInput({ image, onChangeImage }: ImageInputProps) {
  const handlePress = async () => {
    const uri = await pickRecipeImage();
    if (uri) onChangeImage(uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Photo</Text>
      <Pressable style={styles.picker} onPress={handlePress}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.preview} />
            <View style={styles.changeBadge}>
              <Text style={styles.changeText}>Change</Text>
            </View>
          </>
        ) : (
          <View style={styles.empty}>
            <Ionicons name="camera-outline" size={32} color="#888" />
            <Text style={styles.emptyText}>Add a photo</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  picker: {
    height: 180,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    overflow: 'hidden',
  },
  preview: { width: '100%', height: '100%' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 6 },
  emptyText: { fontSize: 16, color: '#888' },
  changeBadge: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  changeText: { color: '#FFF', fontWeight: '600' },
});
