import { StyleSheet, Switch, View } from "react-native";
import { AppText } from '../../components/AppText';
import { Colors } from '../../constants/Colors';
import { useDarkMode } from '../../context/recipe_context';

export default function Account() {
  const [dark, setDark] = useDarkMode();

  return (
    <View style={styles.container}>
      <AppText variant="sectionTitle">Dominic Dodge</AppText>
      <View style={styles.row}>
        <AppText>Dark Mode</AppText>
        <Switch value={dark} onValueChange={setDark} trackColor={{ true: Colors.volsOrange }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
