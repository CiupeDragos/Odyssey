import { View, Text } from "react-native";
import { EditProfileScreenNavProps } from "../../../types/navigation";

type EditProfileScreenProps = {
  navigation: EditProfileScreenNavProps;
};

function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  return (
    <View>
      <Text>Welcome to the edit profile screen</Text>
    </View>
  );
}

export default EditProfileScreen;
