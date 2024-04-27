import { StyleSheet, View, Text } from "react-native";

function TravelerLoungeScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the traveler's lounge screen</Text>
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

export default TravelerLoungeScreen;
