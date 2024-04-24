import { ReactNode, createContext, useState, useEffect } from "react";
import { UserData } from "../types/response-types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_DATA_KEY } from "../util/constants";
import * as Splash from "expo-splash-screen";

type MainContextProviderProps = {
  children: ReactNode;
};

type MainContextData = {
  userData: UserData | undefined;
  isLoggedIn: boolean;
  login: (data: UserData) => void;
  logout: () => void;
};

export const MainContext = createContext<MainContextData>({
  userData: undefined,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

Splash.preventAutoHideAsync();

function MainContextProvider({ children }: MainContextProviderProps) {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    async function getUserData() {
      const jsonUserData = await AsyncStorage.getItem(USER_DATA_KEY);

      if (!jsonUserData) {
        Splash.hideAsync();
        return;
      }

      const userData = JSON.parse(jsonUserData);
      handleLogin(userData);
    }

    getUserData();
  }, []);

  function handleLogin(data: UserData) {
    AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
    setUserData(data);
  }

  function handleLogout() {
    AsyncStorage.removeItem(USER_DATA_KEY);
    setUserData(undefined);
  }

  const mainContextData: MainContextData = {
    userData: userData,
    isLoggedIn: !!userData,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <MainContext.Provider value={mainContextData}>
      {children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;
