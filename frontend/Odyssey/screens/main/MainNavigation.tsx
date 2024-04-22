import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabsNavigation from "./MainTabsNavigation";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabsNavigation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
