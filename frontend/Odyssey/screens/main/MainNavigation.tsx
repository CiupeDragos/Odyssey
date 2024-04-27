import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabsNavigation from "./MainTabsNavigation";
import EditProfileScreen from "./profile/EditProfileScreen";
import { Colors } from "../../util/constants";
import FollowersScreen from "./profile/FollowersScreen";
import FollowingScreen from "./profile/FollowingScreen";

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
      <Stack.Screen
        name="Followers"
        component={FollowersScreen}
        options={{
          headerTintColor: "white",
          headerTitle: "Followers",
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
      <Stack.Screen
        name="Following"
        component={FollowingScreen}
        options={{
          headerTintColor: "white",
          headerTitle: "Following",
          headerStyle: { backgroundColor: Colors.primary },
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
