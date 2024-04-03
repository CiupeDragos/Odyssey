import { useContext } from "react";
import { Button } from "react-native";
import { MainContext } from "../../../store/MainContext";

function ProfileScreen() {
  const mainContext = useContext(MainContext);
  return <Button title="Log out" onPress={mainContext.logout} />;
}

export default ProfileScreen;
