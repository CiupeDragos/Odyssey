import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainContextProvider, { MainContext } from "./store/MainContext";
import { useContext } from "react";
import MainNavigation from "./screens/main/MainNavigation";
import AuthNavigation from "./screens/auth/AuthNavigation";
import "react-native-reanimated";

function Navigation() {
  const mainContext = useContext(MainContext);

  return (
    <NavigationContainer>
      {mainContext.isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <MainContextProvider>
        <Navigation />
      </MainContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
