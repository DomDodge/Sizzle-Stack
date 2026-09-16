import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import { Colors } from '../constants/Colors';

export default function RecipeDetails() {
  const { title, instructions } = useLocalSearchParams<{ title: string, instructions: string }>();

  return (
      <View style={styles.container}>
          <View style={styles.imageHeader}></View>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{title || "food-name"}</Text>
            <Text>
              {instructions}
            </Text>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  imageHeader: {
    backgroundColor: Colors.mintGreen,
    width: "100%",
    height: 200,
  },
  innerContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  }
});