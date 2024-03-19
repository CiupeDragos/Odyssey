import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { Colors } from "./util/constants";
import LoginScreen from "./screens/auth/LoginScreen";
import { RootStackParamList } from "./types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

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

function Navigation() {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

declare global {
  namespace ReactNavigation {
    export interface RootParamList extends RootStackParamList {}
  }
}
