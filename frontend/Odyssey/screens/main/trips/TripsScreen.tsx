import { StyleSheet, Text, View } from "react-native";

function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the trips screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TripsScreen;
