import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileUpdateRequest } from "../http/request-types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type AuthNavParamList = {
  Register: undefined;
  Login: undefined;
};

export type BottomNavParamList = {
  Home: undefined;
  Search: undefined;
  Trips: undefined;
  TravelerLounge: undefined;
  Profile: { userId: string } | undefined;
};

export type MainNavParamList = {
  MainTabs: NavigatorScreenParams<BottomNavParamList>;
  EditProfile: ProfileDataParams;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthNavParamList>;

export type ProfileScreenRouteProp = RouteProp<BottomNavParamList, "Profile">;

export type ProfileScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomNavParamList, "Profile">,
  NativeStackNavigationProp<MainNavParamList>
>;

export type EditProfileRouteProp = RouteProp<MainNavParamList, "EditProfile">;

export type EditProfileNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "EditProfile"
>;

// Params
export type ProfileDataParams = Omit<ProfileUpdateRequest, "base64Photo">;
