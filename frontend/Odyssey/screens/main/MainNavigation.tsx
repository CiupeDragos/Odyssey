import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabsNavigation from "./MainTabsNavigation";
import EditProfileScreen from "./profile/EditProfileScreen";
import { Colors } from "../../util/constants";
import FollowersScreen from "./profile/FollowersScreen";
import FollowingScreen from "./profile/FollowingScreen";
import AddLocationScreen from "./home/AddLocationScreen";
import PickLocationScreen from "./home/PickLocationScreen";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTitle: "Edit your profile",
          headerBackTitle: "Profile",
        }}
      />
      <Stack.Screen
        name="Followers"
        component={FollowersScreen}
        options={{
          headerTitle: "Followers",
        }}
      />
      <Stack.Screen
        name="Following"
        component={FollowingScreen}
        options={{
          headerTitle: "Following",
        }}
      />
      <Stack.Screen
        name="AddLocation"
        component={AddLocationScreen}
        options={{
          headerTitle: "Add a new location",
          headerBackTitle: "Home",
        }}
      />
      <Stack.Screen
        name="PickLocation"
        component={PickLocationScreen}
        options={{
          headerTitle: "Pick location",
          headerBackTitle: "Add location",
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
