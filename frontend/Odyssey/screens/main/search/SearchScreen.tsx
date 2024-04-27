import { StyleSheet, Text, View } from "react-native";

function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the search screen</Text>
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

export default SearchScreen;
