import { StyleSheet, Text, View } from "react-native";

type CountIndicatorProps = {
  label: string;
  count: number;
};

function CountIndicator({ label, count }: CountIndicatorProps) {
  return (
    <View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
  label: {
    fontSize: 16,
    color: "white",
  },
});

export default CountIndicator;
