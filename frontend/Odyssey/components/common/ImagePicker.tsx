import { Alert, View, ViewStyle } from "react-native";
import CustomButton from "./CustomButton";
import { Colors } from "../../util/constants";
import * as IPicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getBase64FromUri } from "../../util/commonMethods";

type ImagePickerProps = {
  label: string;
  onPick: (base64Image: string) => void;
  customStyle?: ViewStyle;
};

function ImagePicker({ label, onPick, customStyle }: ImagePickerProps) {
  async function handlePhotoPick() {
    const result = await IPicker.launchImageLibraryAsync({
      mediaTypes: IPicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) return;

    const imageUri = result.assets[0].uri;
    const base64Img = await getBase64FromUri(imageUri);

    if (!base64Img) {
      Alert.alert("Failed to load image");
      return;
    }

    onPick(base64Img);
  }

  return (
    <View style={customStyle}>
      <CustomButton
        color={Colors.secondary}
        label={label}
        onTap={handlePhotoPick}
        outlined
      />
    </View>
  );
}

export default ImagePicker;
