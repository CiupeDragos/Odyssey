import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
