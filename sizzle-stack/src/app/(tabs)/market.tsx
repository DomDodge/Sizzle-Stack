import { StyleSheet, Text, View } from "react-native";

export default function Market() {
  return (
    <View style={styles.container}>
      <Text>Get new recipes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
