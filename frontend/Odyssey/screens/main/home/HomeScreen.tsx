import { useContext } from "react";
import { Button, Text } from "react-native";
import { MainContext } from "../../../store/MainContext";

function HomeScreen() {
  const mainContext = useContext(MainContext);

  return <Button title="Log out" onPress={mainContext.logout} />;
}

export default HomeScreen;
