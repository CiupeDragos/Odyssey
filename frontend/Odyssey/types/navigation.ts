import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
  RouteProp,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProfileUpdateRequest } from "./request-types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import {
  Coordinates,
  Follower,
  LocationPost,
  LoungeThread,
  TextLocation,
} from "./response-types";

export type AuthNavParamList = {
  Register: undefined;
  Login: undefined;
};

export type BottomNavParamList = {
  Home: undefined;
  Search: undefined;
  Trips: { refetchKey: number } | undefined;
  TravelerLounge: { refetchKey: number } | undefined;
  Profile: { userId: string } | undefined;
};

export type MainNavParamList = {
  MainTabs: NavigatorScreenParams<BottomNavParamList>;
  EditProfile: ProfileDataParams;
  Followers: FollowersScreenParams;
  Following: FollowingScreenParams;
  AddLocation:
    | { textLocation: TextLocation; coordinates: Coordinates }
    | undefined;
  PickLocation: { initialLocation: Coordinates };
  LocationDetails: { location: LocationPost };
  AddThread: undefined;
  ThreadDetails: { thread: LoungeThread };
  AddTrip: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthNavParamList>;

export type ProfileScreenRouteProp = RouteProp<BottomNavParamList, "Profile">;

export type TripsScreenRouteProp = RouteProp<BottomNavParamList, "Trips">;

export type LoungeScreenRouteProp = RouteProp<
  BottomNavParamList,
  "TravelerLounge"
>;

export type BottomTabsNav = BottomTabNavigationProp<
  BottomNavParamList,
  "Search"
>;

export type ProfileScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomNavParamList, "Profile">,
  NativeStackNavigationProp<MainNavParamList>
>;

export type PickLocationRouteProp = RouteProp<MainNavParamList, "PickLocation">;
export type ThreadDetailsRouteProp = RouteProp<
  MainNavParamList,
  "ThreadDetails"
>;

export type PickLocationNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "PickLocation"
>;

export type MainStackNavProp = NativeStackNavigationProp<MainNavParamList>;

export type LocationDetailsRouteProp = RouteProp<
  MainNavParamList,
  "LocationDetails"
>;

export type EditProfileRouteProp = RouteProp<MainNavParamList, "EditProfile">;

export type EditProfileNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "EditProfile"
>;

export type AddLocationNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "AddLocation"
>;

export type AddThreadNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "AddThread"
>;

export type AddLocationRouteProp = RouteProp<MainNavParamList, "AddLocation">;

export type FollowersRouteProp = RouteProp<MainNavParamList, "Followers">;
export type FollowingRouteProp = RouteProp<MainNavParamList, "Following">;

export type FollowersNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "Followers"
>;

export type FollowingNavProp = NativeStackNavigationProp<
  MainNavParamList,
  "Following"
>;

export type HomeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomNavParamList, "Home">,
  NativeStackNavigationProp<MainNavParamList>
>;

export type LoungeScreenNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomNavParamList, "TravelerLounge">,
  NativeStackNavigationProp<MainNavParamList>
>;

// Params
export type ProfileDataParams = Omit<ProfileUpdateRequest, "base64Photo">;
export type FollowersScreenParams = {
  username: string;
  followers: Array<Follower>;
};
export type FollowingScreenParams = {
  username: string;
  following: Array<Follower>;
};
