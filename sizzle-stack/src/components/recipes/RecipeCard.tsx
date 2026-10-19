import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Recipe } from '../../context/recipe_context';
import { AppText } from '../AppText';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const { id, title, image } = recipe;

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push({ pathname: '/recipe-detail', params: { id: String(id) } })}
    >
      <ImageBackground
        source={image ? { uri: image } : undefined}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}
      >
        <LinearGradient
          colors={['rgba(24, 28, 36, 0.0)', 'rgba(22, 22, 22, 1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientOverlay}
        >
          <AppText variant="itemTitle" style={styles.title}>{title}</AppText>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '47%',
    height: 115,
    backgroundColor: Colors.mintGreen,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Aligns overlay container to bottom
  },
  imageStyle: { borderRadius: 12 },
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
  title: {
    color: '#FFFFFF', // White text contrast against image
  },
});
