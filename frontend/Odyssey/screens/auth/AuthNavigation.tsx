import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavParamList } from "../../types/navigation";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createNativeStackNavigator<AuthNavParamList>();

function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Log into your account" }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Register an account" }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
