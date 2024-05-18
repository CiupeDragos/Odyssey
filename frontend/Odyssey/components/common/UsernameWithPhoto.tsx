import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  DimensionValue,
} from "react-native";
import { BASE_URL, Colors } from "../../util/constants";

type UsernameWithPhotoProps = {
  userId: string;
  username: string;
  onClick?: () => void;
  usernameFontSize?: number;
  imgWidth?: DimensionValue;
  imgHeight?: DimensionValue;
  usernameMarginLeft?: number;
};

function UsernameWithPhoto({
  userId,
  username,
  onClick,
  imgWidth = "20%",
  imgHeight = 75,
  usernameFontSize = 24,
  usernameMarginLeft = 24,
}: UsernameWithPhotoProps) {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Image
        style={[styles.photo, { width: imgWidth, height: imgHeight }]}
        source={{ uri: `${BASE_URL}/profile/${userId}.jpg` }}
      />
      <Text
        style={[
          styles.username,
          { fontSize: usernameFontSize, marginLeft: usernameMarginLeft },
        ]}
      >
        {username}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 4,
    alignItems: "center",
  },
  username: {
    fontWeight: "400",
  },
  photo: {
    borderRadius: 100,
    borderColor: Colors.primary,
    borderWidth: 2,
  },
});

export default UsernameWithPhoto;
