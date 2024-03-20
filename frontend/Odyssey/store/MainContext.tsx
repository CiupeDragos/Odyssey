import { ReactNode, createContext, useState } from "react";
import { UserData } from "../http/response-types";

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

function MainContextProvider({ children }: MainContextProviderProps) {
  const [userData, setUserData] = useState<UserData>();

  function handleLogin(data: UserData) {
    // Need to save user data in some credentials local storage
    setUserData(data);
  }

  function handleLogout() {
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
