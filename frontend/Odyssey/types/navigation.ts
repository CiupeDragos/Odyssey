import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type AuthNavParamList = {
  Register: undefined;
  Login: undefined;
};

export type MainNavParamList = {
  Home: undefined;
  Search: undefined;
  Trips: undefined;
  TravelerLounge: undefined;
  Profile: { userId: string } | undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthNavParamList>;
export type MainNavigationProp = NativeStackNavigationProp<MainNavParamList>;
export type ProfileScreenRouteProp = RouteProp<MainNavParamList, "Profile">;
