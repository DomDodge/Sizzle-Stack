import { StyleSheet, View } from "react-native";
import { AppText } from '../../components/AppText';

export default function Account() {
  return (
    <View style={styles.container}>
      <AppText>Dominic Dodge</AppText>
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
