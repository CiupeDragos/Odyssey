import { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import * as Splash from "expo-splash-screen";

function HomeScreen() {
  useEffect(() => {
    Splash.hideAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the home screen</Text>
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

export default HomeScreen;
