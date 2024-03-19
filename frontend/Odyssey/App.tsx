import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { Colors } from "./util/constants";
import LoginScreen from "./screens/auth/LoginScreen";
import { AuthNavParamList, MainNavParamList } from "./types/navigation";
import HomeScreen from "./screens/main/home/HomeScreen";
import MainContextProvider, { MainContext } from "./store/MainContext";
import { useContext } from "react";

const Stack = createNativeStackNavigator<AuthNavParamList>();
const BottomTab = createBottomTabNavigator<MainNavParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register an account" }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Log into your account" }}
      />
    </Stack.Navigator>
  );
}

function MainNavigation() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={HomeScreen} />
    </BottomTab.Navigator>
  );
}

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
