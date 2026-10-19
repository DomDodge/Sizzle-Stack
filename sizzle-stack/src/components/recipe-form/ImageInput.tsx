import { Image, Keyboard, Pressable, StyleSheet } from 'react-native';
import { fieldBorder } from '../../constants/Styles';
import { pickRecipeImage } from '../../utils/pickRecipeImage';
import EmptyState from '../ui/EmptyState';
import FormField from '../ui/FormField';
import PhotoBadge from '../ui/PhotoBadge';

interface ImageInputProps {
  image: string;
  onChangeImage: (uri: string) => void;
}

export default function ImageInput({ image, onChangeImage }: ImageInputProps) {
  const handlePress = async () => {
    Keyboard.dismiss();
    const uri = await pickRecipeImage();
    if (uri) onChangeImage(uri);
  };

  return (
    <FormField label="Photo">
      <Pressable style={styles.picker} onPress={handlePress}>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.preview} />
            <PhotoBadge label="Change" />
          </>
        ) : (
          <EmptyState icon="camera-outline" message="Add a photo" iconSize={32} style={styles.empty} />
        )}
      </Pressable>
    </FormField>
  );
}

const styles = StyleSheet.create({
  picker: { ...fieldBorder, height: 180, overflow: 'hidden' },
  preview: { width: '100%', height: '100%' },
  empty: { flex: 1, gap: 6 },
});
