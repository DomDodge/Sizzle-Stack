import { StyleSheet, Text, View } from "react-native";

export default function Grocery() {
  return (
    <View style={styles.container}>
      <Text>Your grocery list</Text>
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
