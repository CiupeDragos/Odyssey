import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainContextProvider, { MainContext } from "./store/MainContext";
import { useContext } from "react";
import MainNavigation from "./screens/main/MainNavigation";
import AuthNavigation from "./screens/auth/AuthNavigation";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function Navigation() {
  const mainContext = useContext(MainContext);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        {mainContext.isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
      </NavigationContainer>
    </GestureHandlerRootView>
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
