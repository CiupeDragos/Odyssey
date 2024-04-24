import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabsNavigation from "./MainTabsNavigation";
import EditProfileScreen from "./profile/EditProfileScreen";
import { Colors } from "../../util/constants";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTintColor: "white",
          headerTitle: "Edit your profile",
          headerBackTitle: "Profile",
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
