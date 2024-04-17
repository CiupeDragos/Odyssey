import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MainNavParamList } from "../../types/navigation";
import HomeScreen from "./home/HomeScreen";
import ProfileScreen from "./profile/ProfileScreen";
import SearchScreen from "./search/SearchScreen";
import TravelerLoungeScreen from "./travelerlounge/TravelerLoungeScreen";
import TripsScreen from "./trips/TripsScreen";

const BottomTab = createBottomTabNavigator<MainNavParamList>();

function MainNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={{ headerTitle: "", tabBarShowLabel: false }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="search" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="map" />
          ),
        }}
      />
      <BottomTab.Screen
        name="TravelerLounge"
        component={TravelerLoungeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons color={color} size={size} name="question-answer" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="person" />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default MainNavigation;
