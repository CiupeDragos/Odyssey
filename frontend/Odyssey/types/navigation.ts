import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileUpdateRequest } from "../http/request-types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type AuthNavParamList = {
  Register: undefined;
  Login: undefined;
};

export type MainNavParamList = {
  BottomTabs: undefined;
  EditProfile: ProfileDataParams;
};

export type BottomNavParamList = {
  Home: undefined;
  Search: undefined;
  Trips: undefined;
  TravelerLounge: undefined;
  Profile: { userId: string } | undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthNavParamList>;

export type ProfileScreenRouteProp = RouteProp<BottomNavParamList, "Profile">;

export type ProfileScreenNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomNavParamList, "Profile">,
  NativeStackNavigationProp<MainNavParamList>
>;

export type EditProfileScreenNavProps = CompositeNavigationProp<
  NativeStackNavigationProp<MainNavParamList, "EditProfile">,
  BottomTabNavigationProp<BottomNavParamList>
>;

// Params
export type ProfileDataParams = Omit<ProfileUpdateRequest, "base64Photo">;
