import { ReactNode, createContext, useState } from "react";

type MainContextProviderProps = {
  children: ReactNode;
};

type MainContextData = {
  userData: string | undefined;
  isLoggedIn: boolean;
  login: (data: string) => void;
  logout: () => void;
};

export const MainContext = createContext<MainContextData>({
  userData: undefined,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

function MainContextProvider({ children }: MainContextProviderProps) {
  const [userData, setUserData] = useState<string>();

  function handleLogin(data: string) {
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
