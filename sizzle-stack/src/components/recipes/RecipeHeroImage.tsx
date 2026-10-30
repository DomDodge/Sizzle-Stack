import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { useColors } from '../../context/recipe_context';

interface RecipeHeroImageProps {
  image: string;
  uploading: boolean;
  onPress?: () => void;
}

// Full-width header photo; tap it to add or change the picture. Without onPress it is display-only.
export default function RecipeHeroImage({ image, uploading, onPress }: RecipeHeroImageProps) {
  const c = useColors();
  return (
    <Pressable onPress={onPress} disabled={uploading || !onPress}>
      <ImageBackground source={image ? { uri: image } : undefined} style={[styles.image, { backgroundColor: c.border }]}>
        <LinearGradient
                  colors={[c.opaque, c.background]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.gradientOverlay}
                >
          {/* {uploading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <PhotoBadge icon="camera" label={image ? 'Change Photo' : 'Add Photo'} />
          )} */}
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start', // Pins text to left
  },
});
