import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { BottomTabsNav } from "../../../types/navigation";

type CustomTabButtonProps = BottomTabBarButtonProps;

function CustomTabButton(props: CustomTabButtonProps) {
  const navigation = useNavigation<BottomTabsNav>();

  function handleNavigation() {
    console.log("Navigated from the custom button");
    navigation.navigate("Profile", { userId: undefined });
  }

  return (
    <TouchableOpacity {...props} onPress={handleNavigation}></TouchableOpacity>
  );
}

export default CustomTabButton;
