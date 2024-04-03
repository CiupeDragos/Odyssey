import { useContext, useEffect } from "react";
import { Text } from "react-native";
import { MainContext } from "../../../store/MainContext";
import * as Splash from "expo-splash-screen";

function HomeScreen() {
  useEffect(() => {
    Splash.hideAsync();
  }, []);

  return <Text>Welcome to the home screen</Text>;
}

export default HomeScreen;
