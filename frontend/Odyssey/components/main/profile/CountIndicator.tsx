import { Pressable, StyleSheet, Text, View } from "react-native";

type CountIndicatorProps = {
  label: string;
  count: number;
  onClick?: () => void;
};

function CountIndicator({ label, count, onClick }: CountIndicatorProps) {
  return (
    <View>
      <Pressable onPress={onClick}>
        <Text style={styles.count}>{count}</Text>
        <Text style={styles.label}>{label}</Text>
      </Pressable>
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
