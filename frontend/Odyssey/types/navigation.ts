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
  Profile: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthNavParamList>;
