import { StyleSheet, Text, View } from "react-native";

export default function Account() {
  return (
    <View style={styles.container}>
      <Text>Mike Winslow</Text>
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
