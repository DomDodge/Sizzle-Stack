import { ActivityIndicator, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { useColors } from '../../context/recipe_context';
import PhotoBadge from '../ui/PhotoBadge';

interface RecipeHeroImageProps {
  image: string;
  uploading: boolean;
  onPress: () => void;
}

// Full-width header photo; tap it to add or change the picture.
export default function RecipeHeroImage({ image, uploading, onPress }: RecipeHeroImageProps) {
  const c = useColors();
  return (
    <Pressable onPress={onPress} disabled={uploading}>
      <ImageBackground source={image ? { uri: image } : undefined} style={[styles.image, { backgroundColor: c.border }]}>
        {uploading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <PhotoBadge icon="camera" label={image ? 'Change Photo' : 'Add Photo'} />
        )}
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
